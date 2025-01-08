import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import jwtDecode from "jwt-decode";
import { AdminLayout } from "../../../layouts";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Alert,
} from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import Axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import {
  getSingleNews,
  deleteNews,
  updateOneNews,
} from "../../../redux/actions";
import ImageUpload from "../../../components/section/imageUpload";

export const NewsAdminView = (props) => {
  const token = localStorage.IdToken;
  const decodedToken = jwtDecode(token);
  const { slug } = props.match.params;
  const { history } = props;
  const [modal, setModal] = useState(false);
  const [body, setBody] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploadImagePercent, SetUploadImagePercent] = useState(0);
  const [isImageChoosed, setIsImageChoosed] = useState(false);
  const [isUploadingImageStarted, setIsUploadingImageStarted] = useState(false);
  const [errors, setErrors] = useState(null);
  const [files, setFiles] = useState([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [variables, setVariables] = useState({
    title: "",
    newsBody: "",
    authorId: "",
    image: "",
  });

  const toggle = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const setText = (e, editor) => {
    const textData = editor.getContent();
    setBody(textData);
  };

  const onChange = (e) =>
    setVariables({
      ...variables,
      [e.target.name]: e.target.value,
    });

  const oneNews = useSelector((state) => state.newsReducer.oneNews);
  const error = useSelector((state) => state.newsReducer.error);
  // const message = useSelector(state => state.newsReducer.message);

  const dispatch = useDispatch();

  const deleteANews = (slug) => {
    dispatch(deleteNews(slug, history));
    setModal(false);
  };

  const handleOnUploadImage = async (e) => {
    e.preventDefault();
    setIsUploadingImageStarted(true);
    let data = new FormData();
    data.append("file", files[0]);
    data.append("tags", `celestin, image`);
    data.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    ); // Replace the preset name with your own
    // data.append('api_key', REACT_APP_CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
    data.append("timestamp", (Date.now() / 1000) | 0);
    data.append("folder", "QUINCAPARADI/ITEMS");

    const options = {
      onUploadProgress: (progressEvent) =>
        SetUploadImagePercent(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        ),
    };

    await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
      {
        method: "post",
        body: data,
      },
      options
    )
      .then((resp) => resp.json())
      .then((data) => {
        SetUploadImagePercent(100);
        setUploadedImageUrl(data.secure_url);
        localStorage.removeItem("imageUrl");
        localStorage.setItem("imageUrl", data.secure_url);
      })
      .catch((err) => {
        setIsUploadingImageStarted(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setVariables({
      title: oneNews.title,
      newsBody: oneNews.newsBody,
      authorId: oneNews.authorId,
      image: oneNews.image,
    });
    if (slug) {
      setEdit(true);
      setLoading(true);
    }
    if (files && files[0]) {
      setIsImageChoosed(true);
    }
    dispatch(getSingleNews(slug));
  }, [
    dispatch,
    files,
    oneNews.authorId,
    oneNews.image,
    oneNews.newsBody,
    oneNews.title,
    slug,
  ]);

  const data = {
    news: {
      ...variables,
      newsBody: body !== "" ? body : variables.newsBody,
      image: uploadedImageUrl !== "" ? uploadedImageUrl : variables.image,
    },
  };

  const updateNews = () => {
    dispatch(updateOneNews(slug, data, history));
  };

  return (
    <AdminLayout>
      <Container fluid className="dashboard-content">
        <Row>
          <Col sm={8}>
            <div className="page-header">
              <h2 className="pageheader-title">
                Destinations |{oneNews.title}
              </h2>
              <div className="page-breadcrumb">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/account" className="breadcrumb-link">
                        Dashboard
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link
                        to="/account/destinations"
                        className="breadcrumb-link"
                      >
                        Destinations
                      </Link>
                    </li>
                    <li className="breadcrumb-item">View</li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {oneNews.title}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </Col>
          {/* <Col sm={2}>
            <Link
              to={`/account/destinations/comment/${slug}`}
              className='btn btn-block btn-light'
            >
              <i className='fa fa-comment mr-1'></i>Comments
            </Link>
          </Col> */}
          <Col sm={2}>
            <Link
              to="/account/destinations"
              className="btn btn-block btn-light"
            >
              <i className="fa fa-arrow-left mr-1"></i> Go Back
            </Link>
          </Col>
        </Row>

        <div className="ecommerce-widget">
          <Row>
            <Col xs={8} lg={8} md={12} sm={12}>
              <div className="card">
                <div className="card-body">
                  <Form>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={variables.title}
                        onChange={onChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Image Cover</Form.Label>
                      <ImageUpload
                        coverURL={
                          variables.image !== ""
                            ? variables.image
                            : "https://res.cloudinary.com/dfsai53mw1/image/upload/v1701413117/WEBS/godiscover/default_Image_rgcqj7_jdxotc.jpggg"
                        }
                        edit={edit}
                        files={files}
                        setFiles={setFiles}
                        text="Blog Cover "
                        useDropzone={useDropzone}
                        handleOnUploadImage={handleOnUploadImage}
                        uploadImagePercent={uploadImagePercent}
                        isImageChoosed={isImageChoosed}
                        isUploadingImageStarted={isUploadingImageStarted}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Body</Form.Label>
                      <Editor
                        apiKey="rtvl5mnciwns1upf4xigvav5mqzimvy9kw68iqbbd0thtfau"
                        init={{
                          height: 300,
                          menubar: false,
                        }}
                        name="newsBody"
                        value={variables.newsBody}
                        onChange={setText}
                      />
                    </Form.Group>
                  </Form>
                </div>
                <div className="card-footer">
                  <div>{error && <Alert variant="danger">{error}</Alert>}</div>

                  <div className="">
                    <div>
                      {errors &&
                        errors.map((value, indx) => (
                          <Alert key={indx} variant="danger">
                            {value}
                          </Alert>
                        ))}
                      {/* {message && <Alert variant='success'>{message}</Alert>} */}
                    </div>

                    {decodedToken && decodedToken.role === "admin" && (
                      <>
                        <Button
                          variant="danger"
                          className="mr-2 bg-dander"
                          onClick={() => toggle()}
                          style={{ color: "red !important" }}
                        >
                          <i className="fa fa-trash"></i> Delete
                        </Button>
                        <Button
                          className="btn btn-lg"
                          variant="primary"
                          onClick={() => updateNews()}
                        >
                          <i className="fa fa-save"></i>{" "}
                          {loading ? "Update" : "Updating..."}
                        </Button>
                      </>
                    )}
                    {modal && (
                      <Modal show={modal} onHide={() => closeModal()}>
                        <Modal.Header closeButton key={oneNews.id}>
                          <Modal.Title id="contained-modal-title-vcenter">
                            Are you sure you want to detete this news? "
                            <b style={{ color: "brown" }}>{oneNews.title}</b>"
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                          <Button
                            className="btn btn-sm"
                            style={{ backgroundColor: "#c3c3c3" }}
                            onClick={() => closeModal()}
                          >
                            No
                          </Button>{" "}
                          <Button
                            className="btn btn-primary btn-sm"
                            onClick={() => deleteANews(oneNews.slug)}
                          >
                            Yes
                          </Button>{" "}
                        </Modal.Footer>
                      </Modal>
                    )}
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={4}>
              <Image
                alt="Travel Banner"
                title="Travel Banner"
                src={oneNews.images[0]}
                className="img-fluid"
              />
            </Col>
          </Row>
        </div>
      </Container>
    </AdminLayout>
  );
};
