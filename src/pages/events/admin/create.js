import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import DateTimePicker from 'react-datetime-picker';
import './index.css';
import { AdminLayout } from '../../../layouts';
import { TinyEditor } from '../../../components/plugin';
import ImageUpload from '../../../components/section/imageUpload';
import { createEvent } from '../../../redux/actions';

export const EventsCreate = () => {
  const [body, setBody] = useState('');
  const [variables, setVariables] = useState({
    title: '',
    startDate: '',
    endDate: '',
    place: '',
    price: '',
    description: '',
    image: '',
  });
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [uploadImagePercent, SetUploadImagePercent] = useState(0);
  const [isImageChoosed, setIsImageChoosed] = useState(false);
  const [isUploadingImageStarted, setIsUploadingImageStarted] = useState(false);
  const [errors, setErrors] = useState(null);
  const [files, setFiles] = useState([]);
  const [startDateValue, onChangeStartDate] = useState(new Date());
  const [endDateValue, onChangeEndDate] = useState(new Date());

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

  const setText = (e, editor) => {
    const textData = editor.getContent();
    setBody(textData);
  };

  const dispatch = useDispatch();

  const errorss = useSelector((state) => state.eventReducer.errors);
  const loading = useSelector((state) => state.eventReducer.loading);

  const onChange = (e) =>
    setVariables({
      ...variables,
      [e.target.name]: e.target.value,
    });

  const data = {
    event: {
      ...variables,
      startDate: startDateValue,
      endDate: endDateValue,
      description: body,
      image: uploadedImageUrl !== '' ? uploadedImageUrl : '',
    },
  };

  useEffect(() => {
    if (files && files[0]) {
      setIsImageChoosed(true);
    }
  }, [files]);

  const submitEvent = () => {
    if (startDateValue === null || endDateValue === null) {
      return setErrors(['Event period(dates) are required!']);
    }

    if (startDateValue > endDateValue) {
      return setErrors(['Starting date can not be greater than Ending date!']);
    }

    if (uploadedImageUrl === '') {
      return setErrors(['Please upload event Cover image to cloud!']);
    }

    if (files.length === 0) {
      return setErrors(['Event Cover image is Required!']);
    }

    dispatch(createEvent(data));
  };

  return (
    <AdminLayout>
      <Container fluid className='dashboard-content'>
        <Row>
          <Col sm={10}>
            <div className='page-header'>
              <h2 className='pageheader-title'>Event | Create</h2>
              <div className='page-breadcrumb'>
                <nav aria-label='breadcrumb'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <Link to='/account' className='breadcrumb-link'>
                        Dashboard
                      </Link>
                    </li>
                    <li className='breadcrumb-item'>
                      <Link to='/account/events' className='breadcrumb-link'>
                        Events
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
            <Link to='/account/events' className='btn btn-block btn-light'>
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
                    <Form.Label></Form.Label>
                    <Form.Group>
                      <Form.Label>Starting Date</Form.Label>
                      <DateTimePicker
                        onChange={onChangeStartDate}
                        value={startDateValue}
                        className='date-controls'
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Ending Date</Form.Label>
                      <DateTimePicker
                        onChange={onChangeEndDate}
                        value={endDateValue}
                        className='date-controls'
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Place / Location</Form.Label>
                      <Form.Control
                        type='text'
                        name='place'
                        value={variables.place}
                        onChange={onChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Price / Amount</Form.Label>
                      <Form.Control
                        type='number'
                        name='price'
                        value={variables.price}
                        onChange={onChange}
                      />
                    </Form.Group>
                    <Form.Label>Image Cover</Form.Label>
                    <Form.Group>
                      <ImageUpload
                        files={files}
                        setFiles={setFiles}
                        text='Event Cover '
                        useDropzone={useDropzone}
                        handleOnUploadImage={handleOnUploadImage}
                        uploadImagePercent={uploadImagePercent}
                        isImageChoosed={isImageChoosed}
                        isUploadingImageStarted={isUploadingImageStarted}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <TinyEditor onChange={setText} value={body} />
                    </Form.Group>
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
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className='card-footer'>
                  <div className=''>
                    <Button
                      className='btn btn-lg'
                      variant='primary'
                      onClick={() => submitEvent()}
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
