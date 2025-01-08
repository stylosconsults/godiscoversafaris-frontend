import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { AdminLayout } from "../../../layouts";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { TinyEditor } from "../../../components/plugin";
import { createOneNews } from "../../../redux/actions";
import ImageUpload from "../../../components/section/imageUpload";

export const NewsCreate = () => {
  const [body, setBody] = useState("");
  const [variables, setVariables] = useState({
    title: "",
    newsBody: "",
    authorId: "",
    images: [], // Changed from single image to array of images
  });
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]); // Changed to array for multiple images
  const [uploadImagePercent, SetUploadImagePercent] = useState(0);
  const [isImageChoosed, setIsImageChoosed] = useState(false);
  const [isUploadingImageStarted, setIsUploadingImageStarted] = useState(false);
  const [errors, setErrors] = useState(null);
  const [files, setFiles] = useState([]);

  const handleOnUploadImages = async (e) => {
    e.preventDefault();
    setIsUploadingImageStarted(true);

    try {
      // Create an array to store upload promises
      const uploadPromises = files.map(async (file) => {
        let data = new FormData();
        data.append("file", file);
        data.append("tags", `celestin, image`);
        data.append(
          "upload_preset",
          process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
        );
        data.append("timestamp", (Date.now() / 1000) | 0);
        data.append("folder", "QUINCAPARADI/ITEMS");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
          {
            method: "post",
            body: data,
          }
        );
        const imageData = await response.json();
        return imageData.secure_url;
      });

      // Wait for all uploads to complete
      const urls = await Promise.all(uploadPromises);

      setUploadedImageUrls(urls);
      SetUploadImagePercent(100);

      // Store URLs in localStorage as JSON string
      localStorage.setItem("imageUrls", JSON.stringify(urls));

      console.log("UPLOADED IMAGES:", urls);
    } catch (err) {
      setIsUploadingImageStarted(false);
      console.error("Upload error:", err);
      setErrors(["Failed to upload one or more images"]);
    }
  };

  const setText = (e, editor) => {
    const textData = editor.getContent();
    setBody(textData);
  };

  const dispatch = useDispatch();

  const errorss = useSelector((state) => state.newsReducer.errors);
  const loading = useSelector((state) => state.newsReducer.loading);

  const onChange = (e) =>
    setVariables({
      ...variables,
      [e.target.name]: e.target.value,
    });

  const data = {
    news: {
      ...variables,
      newsBody: body,
      images: uploadedImageUrls,
    },
  };

  useEffect(() => {
    if (files && files.length > 0) {
      setIsImageChoosed(true);
    }
  }, [files]);

  const submitNews = () => {
    if (uploadedImageUrls.length === 0) {
      return setErrors([
        "Please upload at least one blog Cover image to cloud!",
      ]);
    }

    if (files.length === 0) {
      return setErrors(["At least one Blog Cover image is Required!"]);
    }

    dispatch(createOneNews(data));
  };

  return (
    <AdminLayout>
      <Container fluid className="dashboard-content">
        <Row>
          <Col sm={10}>
            <div className="page-header">
              <h2 className="pageheader-title">Destinations |Create</h2>
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
                    <li className="breadcrumb-item active" aria-current="page">
                      Create
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </Col>
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
                      <Form.Label>Image Covers (Multiple)</Form.Label>
                      <ImageUpload
                        files={files}
                        setFiles={setFiles}
                        text="Blog Covers"
                        useDropzone={useDropzone}
                        handleOnUploadImage={handleOnUploadImages}
                        uploadImagePercent={uploadImagePercent}
                        isImageChoosed={isImageChoosed}
                        isUploadingImageStarted={isUploadingImageStarted}
                        multiple={true} // Enable multiple file selection
                        context="news"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Body</Form.Label>
                      <TinyEditor onChange={setText} value={body} />
                    </Form.Group>
                  </Form>

                  <Row className="mt-3">
                    <Col xs={12} lg={12} md={12} sm={12}>
                      <div>
                        {errors &&
                          errors.map((value, indx) => (
                            <Alert key={indx} variant="danger">
                              {value}
                            </Alert>
                          ))}

                        {errorss &&
                          errorss.map((err, i) => (
                            <Alert key={i} variant="danger">
                              {err}
                            </Alert>
                          ))}
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="card-footer">
                  <div className="">
                    <Button
                      className="btn btn-lg"
                      variant="primary"
                      onClick={() => submitNews()}
                    >
                      <i className="fa fa-save"></i>{" "}
                      {loading ? "Save" : "Save..."}
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </AdminLayout>
  );
};
