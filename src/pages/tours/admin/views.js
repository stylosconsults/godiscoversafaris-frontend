import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import jwtDecode from 'jwt-decode';
import { AdminLayout } from '../../../layouts';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Alert,
} from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { Editor } from '@tinymce/tinymce-react';
import {
  getSingleTours,
  deleteTours,
  updateOneTours,
} from '../../../redux/actions';
import ImageUpload from '../../../components/section/imageUpload';

export const ToursAdminView = (props) => {
  const token = localStorage.IdToken;
  const decodedToken = jwtDecode(token);
  const { slug } = props.match.params;
  const { history } = props;
  const [modal, setModal] = useState(false);
  const [body, setBody] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [uploadImagePercent, SetUploadImagePercent] = useState(0);
  const [isImageChoosed, setIsImageChoosed] = useState(false);
  const [isUploadingImageStarted, setIsUploadingImageStarted] = useState(false);
  const [errors, setErrors] = useState(null);
  const [files, setFiles] = useState([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [variables, setVariables] = useState({
    title: '',
    toursBody: '',
    price1: '',
    price2: '',
    price3: '',
    price4: '',
    price5: '',
    authorId: '',
    image: '',
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

  const oneTours = useSelector((state) => state.toursReducer.oneTours);
  const error = useSelector((state) => state.toursReducer.error);
  // const message = useSelector(state => state.toursReducer.message);

  const dispatch = useDispatch();

  const deleteATours = (slug) => {
    dispatch(deleteTours(slug, history));
    setModal(false);
  };
  const handleOnUploadImage = async (e) => {
    e.preventDefault();
    setIsUploadingImageStarted(true);
    let data = new FormData();
    data.append('file', files[0]);
    data.append('tags', `celestin, image`);
    data.append(
      'upload_preset',
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    ); // Replace the preset name with your own
    // data.append('api_key', REACT_APP_CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
    data.append('timestamp', (Date.now() / 1000) | 0);
    data.append('folder', 'QUINCAPARADI/ITEMS');

    const options = {
      onUploadProgress: (progressEvent) =>
        SetUploadImagePercent(
          Math.round((progressEvent.loaded * 100) / progressEvent.total),
        ),
    };

    await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
      {
        method: 'post',
        body: data,
      },
      options,
    )
      .then((resp) => resp.json())
      .then((data) => {
        SetUploadImagePercent(100);
        setUploadedImageUrl(data.secure_url);
        localStorage.removeItem('imageUrl');
        localStorage.setItem('imageUrl', data.secure_url);
        console.log('UPLOADED', data.secure_url);
      })
      .catch((err) => {
        setIsUploadingImageStarted(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setVariables({
      title: oneTours.title,
      toursBody: oneTours.toursBody,
      authorId: oneTours.authorId,
      price1: oneTours.price1,
      price2: oneTours.price2,
      price3: oneTours.price3,
      price4: oneTours.price4,
      price5: oneTours.price5,
      image: oneTours.image,
    });
    if (slug) {
      setEdit(true);
      setLoading(true);
    }
    if (files && files[0]) {
      setIsImageChoosed(true);
    }
    dispatch(getSingleTours(slug));
  }, [
    dispatch,
    files,
    oneTours.authorId,
    oneTours.image,
    oneTours.title,
    oneTours.price1,
    slug,
    oneTours.toursBody,
    oneTours.price2,
    oneTours.price3,
    oneTours.price5,
    oneTours.price4,
  ]);

  const data = {
    tours: {
      ...variables,
      toursBody: body !== '' ? body : variables.toursBody,
      image: uploadedImageUrl !== '' ? uploadedImageUrl : variables.image,
    },
  };

  const updateTours = () => {
    dispatch(updateOneTours(slug, data, history));
  };

  return (
    <AdminLayout>
      <Container fluid className='dashboard-content'>
        <Row>
          <Col sm={8}>
            <div className='page-header'>
              <h2 className='pageheader-title'>Tours | {oneTours.title}</h2>
              <div className='page-breadcrumb'>
                <nav aria-label='breadcrumb'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <Link to='/account' className='breadcrumb-link'>
                        Dashboard
                      </Link>
                    </li>
                    <li className='breadcrumb-item'>
                      <Link to='/account/tours' className='breadcrumb-link'>
                        Tours
                      </Link>
                    </li>
                    <li className='breadcrumb-item'>View</li>
                    <li className='breadcrumb-item active' aria-current='page'>
                      {oneTours.title}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </Col>
          {/* <Col sm={2}>
						<Link
							to={`/account/tours/comment/${slug}`}
							className='btn btn-block btn-light'
						>
							<i className='fa fa-comment mr-1'></i>Comments
						</Link>
					</Col> */}
          <Col sm={2}>
            <Link to='/account/tours' className='btn btn-block btn-light'>
              <i className='fa fa-arrow-left mr-1'></i> Go Back
            </Link>
          </Col>
        </Row>

        <div className='ecommerce-widget'>
          <Row>
            <Col xs={8} lg={8} md={12} sm={12}>
              <div className='card'>
                <div className='card-body'>
                  <Form>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type='text'
                        name='title'
                        value={variables.title}
                        onChange={onChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Price 1 person</Form.Label>
                      <Form.Control
                        type='number'
                        name='price1'
                        value={variables.price1}
                        onChange={onChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Price 2 People</Form.Label>
                      <Form.Control
                        type='number'
                        name='price2'
                        value={variables.price2}
                        onChange={onChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Price 3 People </Form.Label>
                      <Form.Control
                        type='number'
                        name='price3'
                        value={variables.price3}
                        onChange={onChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Price 4 People </Form.Label>
                      <Form.Control
                        type='number'
                        name='price4'
                        value={variables.price4}
                        onChange={onChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Price 5 People</Form.Label>
                      <Form.Control
                        type='number'
                        name='price5'
                        value={variables.price5}
                        onChange={onChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Image Cover</Form.Label>
                      <ImageUpload
                        coverURL={
                          variables.image !== ''
                            ? variables.image
                            : 'https://res.cloudinary.com/dfsai53mw1/image/upload/v1701413117/WEBS/godiscover/default_Image_rgcqj7_jdxotc.jpg'
                        }
                        edit={edit}
                        files={files}
                        setFiles={setFiles}
                        text='Tour Cover '
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
                        apiKey='rtvl5mnciwns1upf4xigvav5mqzimvy9kw68iqbbd0thtfau'
                        init={{
                          height: 300,
                          menubar: false,
                        }}
                        name='toursBody'
                        value={variables.toursBody}
                        onChange={setText}
                      />
                    </Form.Group>
                  </Form>
                </div>
                <div className='card-footer'>
                  <div>{error && <Alert variant='danger'>{error}</Alert>}</div>

                  <div className=''>
                    <div>
                      {errors &&
                        errors.map((value, indx) => (
                          <Alert key={indx} variant='danger'>
                            {value}
                          </Alert>
                        ))}
                      {/* {message && <Alert variant='success'>{message}</Alert>} */}
                    </div>

                    {decodedToken && decodedToken.role === 'admin' && (
                      <>
                        <Button
                          variant='danger'
                          className='mr-2'
                          onClick={() => toggle()}
                        >
                          <i className='fa fa-trash'></i> Delete
                        </Button>
                        <Button
                          className='btn btn-lg'
                          variant='primary'
                          onClick={() => updateTours()}
                        >
                          <i className='fa fa-save'></i>{' '}
                          {loading ? 'Update' : 'Updating...'}
                        </Button>
                      </>
                    )}
                    {modal && (
                      <Modal show={modal} onHide={() => closeModal()}>
                        <Modal.Header closeButton key={oneTours.id}>
                          <Modal.Title id='contained-modal-title-vcenter'>
                            Are you sure you want to detete this tours? "
                            <b style={{ color: 'brown' }}>{oneTours.title}</b>"
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                          <Button
                            className='btn btn-sm'
                            style={{ backgroundColor: '#c3c3c3' }}
                            onClick={() => closeModal()}
                          >
                            No
                          </Button>{' '}
                          <Button
                            className='btn btn-primary btn-sm'
                            onClick={() => deleteATours(oneTours.slug)}
                          >
                            Yes
                          </Button>{' '}
                        </Modal.Footer>
                      </Modal>
                    )}
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={4}>
              <Image
                alt='Travel Banner'
                title='Travel Banner'
                src={oneTours.image}
                className='img-fluid'
              />
            </Col>
          </Row>
        </div>
      </Container>
    </AdminLayout>
  );
};
