import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { AdminLayout } from '../../../layouts';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { TinyEditor } from '../../../components/plugin';
import { createOneTours } from '../../../redux/actions';
import ImageUpload from '../../../components/section/imageUpload';

export const ToursCreate = () => {
  const [body, setBody] = useState('');

  const [formItems, setFormItems] = useState([]);
  const [variables, setVariables] = useState({
    title: '',
    toursBody: '',
    authorId: '',
    image: '',
    location: '',
    price1: '',
    price2: '',
    price3: '',
    price4: '',
    price5: '',
    departureTime: '',
    tips: ['No'],
    includes: ['No'],
    excludes: ['No'],
    itenerary: [''],
  });
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [uploadImagePercent, SetUploadImagePercent] = useState(0);
  const [isImageChoosed, setIsImageChoosed] = useState(false);
  const [isUploadingImageStarted, setIsUploadingImageStarted] = useState(false);
  const [errors, setErrors] = useState(null);
  const [files, setFiles] = useState([]);

  // Handler function to update form data on input change
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newFormItems = [...formItems];
    newFormItems[index] = {
      ...newFormItems[index],
      [name]: value,
    };
    setFormItems(newFormItems);
  };

  // Handler function to add a new form item
  const handleAddItem = () => {
    setFormItems([...formItems, { day: '', title: '', body: '' }]);
  };

  // Handler function to remove a form item
  const handleRemoveItem = (index) => {
    const newFormItems = [...formItems];
    newFormItems.splice(index, 1);
    setFormItems(newFormItems);
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

  const setText = (e, editor) => {
    const textData = editor.getContent();
    setBody(textData);
  };

  const dispatch = useDispatch();

  const errorss = useSelector((state) => state.toursReducer.errors);
  // const message = useSelector(state => state.toursReducer.message);
  const loading = useSelector((state) => state.toursReducer.loading);

  const onChange = (e) =>
    setVariables({
      ...variables,
      [e.target.name]: e.target.value,
    });

  const data = {
    tours: {
      ...variables,
      toursBody: body,
      image: uploadedImageUrl !== '' ? uploadedImageUrl : '',
      itenerary: [...formItems],
    },
  };

  useEffect(() => {
    if (files && files[0]) {
      setIsImageChoosed(true);
    }
  }, [files]);

  const submitTours = () => {
    if (uploadedImageUrl === '') {
      return setErrors(['Please upload blog Cover image to cloud!']);
    }

    if (files.length === 0) {
      return setErrors(['Blog Cover image is Required!']);
    }

    console.log(data);

    dispatch(createOneTours(data));
  };

  return (
    <AdminLayout>
      <Container fluid className='dashboard-content'>
        <Row>
          <Col sm={10}>
            <div className='page-header'>
              <h2 className='pageheader-title'>Tours | Create</h2>
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
                    <li className='breadcrumb-item active' aria-current='page'>
                      Create
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </Col>
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
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type='text'
                        name='location'
                        value={variables.location}
                        onChange={onChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Departure time</Form.Label>
                      <Form.Control
                        type='text'
                        name='departureTime'
                        value={variables.departureTime}
                        onChange={onChange}
                      />
                    </Form.Group>
                    {/* <Form.Group>
                      <Form.Label>Tips</Form.Label>
                      <Form.Control
                        type='text'
                        name='tips'
                        value={variables.tips}
                        onChange={onChange}
                      />
                    </Form.Group> */}
                    <Form.Group>
                      <Form.Label>Image Cover</Form.Label>
                      <ImageUpload
                        files={files}
                        setFiles={setFiles}
                        text='Blog Cover '
                        useDropzone={useDropzone}
                        handleOnUploadImage={handleOnUploadImage}
                        uploadImagePercent={uploadImagePercent}
                        isImageChoosed={isImageChoosed}
                        isUploadingImageStarted={isUploadingImageStarted}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Body</Form.Label>
                      <TinyEditor onChange={setText} value={body} />
                    </Form.Group>
                    <h1>Iteration</h1>
                    <div>
                      {formItems.map((item, index) => (
                        <>
                          <Form.Group>
                            <Form.Label>Day</Form.Label>
                            <Form.Control
                              type='text'
                              id={`day${index}`}
                              name='day'
                              value={item.day}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Iteration Title</Form.Label>
                            <Form.Control
                              type='text'
                              id={`title${index}`}
                              name='title'
                              value={item.title}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Iteration body</Form.Label>
                            <Form.Control
                              as='textarea'
                              rows={6}
                              id={`body${index}`}
                              name='body'
                              value={item.body}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </Form.Group>
                          <Button
                            className='btn btn-lg'
                            variant='danger'
                            type='button'
                            onClick={() => handleRemoveItem(index)}
                          >
                            Remove Iteration
                          </Button>
                          <hr />
                        </>
                      ))}
                      <Button
                        type='button'
                        className='btn btn-lg'
                        variant='secondary'
                        onClick={handleAddItem}
                      >
                        Add New Iteration
                      </Button>
                    </div>
                  </Form>

                  <Row className='mt-3'>
                    <Col xs={12} lg={12} md={12} sm={12}>
                      <div>
                        {errors &&
                          errors.map((value, indx) => (
                            <Alert key={indx} variant='danger'>
                              {value}
                            </Alert>
                          ))}

                        {errorss &&
                          errorss.map((err, i) => (
                            <Alert key={i} variant='danger'>
                              {err}
                            </Alert>
                          ))}

                        {/* {message && <Alert variant='success'>{message}</Alert>} */}
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className='card-footer'>
                  <div className=''>
                    <Button
                      className='btn btn-lg'
                      variant='primary'
                      onClick={() => submitTours()}
                    >
                      <i className='fa fa-save'></i>{' '}
                      {loading ? 'Save' : 'Saving...'}
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
