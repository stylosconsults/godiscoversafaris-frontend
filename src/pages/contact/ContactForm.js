import React, { useState } from 'react';
import {
  Col,
  Form,
  Alert,
  Button,
} from 'react-bootstrap';
import { sendContactEmail } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../utils/Loading';

import './index.css';

export const ContactForm = () => {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({
    names: '',
    email: '',
    subject: '',
    phone:'',
    message: '',

  });
  const loading = useSelector((state) => state.contact.contactData);
  const contactFailed = useSelector((state) => state.contact.contactFailure);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    e.preventDefault();
    setValidated(true);
    if (user.email && user.message) {
      dispatch(sendContactEmail(user));
    }
    if (!loading && contactFailed === null) {
      setTimeout(function () {
        setUser({
          names: '',
          email: '',
          subject: '',
          message: '',
          phone:''
        });
        setValidated(false);
      }, 1500);
    }
  };

  return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Eg: John Peter'
            value={user.names}
            name='names'
            className='form-control-lg'
            onChange={handleChange}
          />
          <Form.Control.Feedback type='invalid'>
            Full name is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Eg: email@example.com'
            required
            name='email'
            value={user.email}
            className='form-control-lg'
            onChange={handleChange}
          />
          <Form.Control.Feedback type='invalid'>
            Email is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type='text'
            placeholder='Type your subject'
            required
            name='subject'
            value={user.subject}
            className='form-control-lg'
            onChange={handleChange}
          />
          <Form.Control.Feedback type='invalid'>
            Subject is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type='number'
            placeholder='Type your phone'
            required
            name='phone'
            value={user.phone}
            className='form-control-lg'
            onChange={handleChange}
          />
          <Form.Control.Feedback type='invalid'>
            Phone is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control
            as='textarea'
            rows='3'
            placeholder='Message here...'
            type='text'
            name='message'
            value={user.message}
            onChange={handleChange}
          />
          <Form.Control.Feedback type='invalid'>
            message is required
          </Form.Control.Feedback>
        </Form.Group>

        {loading ? (
          <Loading />
        ) : (
          <>
            <Button
              type='submit'
              variant='outline-primary'
              className='mt-3 col-sm-6'
            >
              <i className='fa fa-save'></i> Send message
            </Button>
          </>
        )}
        {contactFailed && (
          <Alert className='alert-warning'>{contactFailed}</Alert>
        )}
      </Form>
  );
};
