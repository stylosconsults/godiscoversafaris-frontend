import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppLayout } from '../../layouts';
import { toast } from 'react-toastify';
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Modal,
  Spinner,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Quote from '../../../src/assets/assetss/willy-wo-pXnMG0FfSwA-unsplash.jpg';

import './index.css';

export const Airticket = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    departureCity: '',
    destinationCity: '',
    departureDate: '',
    returnDate: '',
    numberOfPassengers: 1,
    cabinClass: 'economy',
    specialRequests: '',
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Create HTML content from form data
    const htmlContent = `
      <h3 style="color: #333;">Hello   ${formData.fullName}</h3>

      <h1 style="color: #333;">Air Ticket Inquiry Created</h1>

       <p><strong>Full Name:</strong> ${formData.fullName}</p>
       <p><strong>Email:</strong> ${formData.email}</p>
       <p><strong>Phone:</strong> ${formData.phone}</p>
       <p><strong>Departure City:</strong> ${formData.departureCity}</p>
       <p><strong>Destination City:</strong> ${formData.destinationCity}</p>
       <p><strong>Departure Date:</strong> ${formData.departureDate}</p>
       <p><strong>Return Date:</strong> ${formData.returnDate}</p>
       <p><strong>Number of Passengers:</strong> ${formData.numberOfPassengers}</p>
       <p><strong>Cabin Class:</strong> ${formData.cabinClass}</p>
       <p><strong>Special Requests:</strong> ${formData.specialRequests}</p>
       <p>
       <br><br>
       Need help? Ask our Call us <b>+250 791 349 744</b>  or contact info@godiscoverafrica.rw
       <br><br><br>
       Best regards, 
       <br>
       Website:
       <a
           href='https://godiscoverafrica.rw'
           style="color:#18a0fb; text-decoration:none"
           target='_blank'
       > 
        GODISCOVER AFRICA
       </a>
   </p>
     `;
    // Make API request to send email
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/api/maillist/sendhtml`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sendTo: formData.email, // Replace with the actual recipient email
            subject: 'Air Ticket Inquiry',
            html: htmlContent,
          }),
        },
      );

      if (response.ok) {
        toast.success('Air Ticket sent successfully!');
        console.log('Email sent successfully!');
      } else {
        toast.error('Air Ticket failed, try again later!');
        console.error('Failed to send email:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending email:', error.message);
    } finally {
      setLoading(false);
      setFormData('');
      handleClose();
    }
  };
  return (
    <AppLayout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Airticket | GoDiscover Safaris</title>
        <link rel='canonical' href='https://godiscoverafrica.rw//contact' />
        <meta
          name='description'
          content='Airticket GoDiscover Safaris on the following address: email: ‎+250 791 349 744, email: info@godiscoverafrica.rw '
        />
      </Helmet>
      <div className="home-body"></div>
      <section className='contact bg-light pt-4'>
        <Container>
          <Row className='justify-content-center'>
            <Col sm={7}>
              <h1 className='text-title text-bold mt-3 py-4'>AirTicket</h1>
              <h4 className='text-title text-bold mt-3 py-4'>
                Welcome to GoDiscover Safaris air ticket services
              </h4>
              <p className='mt-1'>
                <br />
                We are a full-service travel agency dedicated to providing our
                clients with personalized travel services that cater to their
                unique needs and preferences. Our experienced and knowledgeable
                travel agents are passionate about travel and are committed to
                making your travel dreams a reality.
                <br />
                <br />
                We offer a wide range of travel services, including but not
                limited to flight bookings, hotel accommodation and car
                rentals. We work with a variety of reputable travel suppliers to
                ensure our clients receive the best possible pricing and
                experiences.
                <br />
                <br />
                At GoDiscover Safaris, we understand that your travel plans may
                change unexpectedly, which is why we offer flexible cancellation
                policies on most bookings. We also provide travel insurance
                options to ensure that you are fully protected and covered in
                the event of any unforeseen circumstances.
                <br />
                <br />
                Customer satisfaction is our top priority, and we strive to
                provide exceptional service to each and every one of our
                clients. If you have questions or need assistance with your
                travel plans, our friendly and knowledgeable customer support
                team is available to help you.
              </p>
              <h4 className='text-title text-bold mt-3 py-4'>
                Please contact us:
              </h4>
              <p className='mt-1'>
                <i className='fa fa-phone mr-2'></i> +250 791 349 744 <br />
                <i className='fa fa-inbox mr-2'></i> info@godiscoverafrica.rw{' '}
                <br />
              </p>
              <p className='py-3'>
                <>
                  <Button
                    onClick={handleShow}
                    variant='outline-primary'
                    className='btn-lg'
                  >
                    <i className='fa fa-save'></i> Fill the form
                  </Button>
                  <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Inquire about air ticket</Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                      style={{
                        maxHeight: 'calc(100vh - 120px)',
                        overflowY: 'auto',
                      }}
                    >
                      <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                          <label htmlFor='fullName'>Full Name</label>
                          <input
                            type='text'
                            className='form-control'
                            id='fullName'
                            name='fullName'
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='email'>Email</label>
                          <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>{' '}
                        <div className='form-group'>
                          <label htmlFor='phone'>Phone Number</label>
                          <input
                            type='number'
                            className='form-control'
                            id='phone'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='departureCity'>Departure City</label>
                          <input
                            type='text'
                            className='form-control'
                            id='departureCity'
                            name='departureCity'
                            value={formData.departureCity}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='destinationCity'>
                            Destination City
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='destinationCity'
                            name='destinationCity'
                            value={formData.destinationCity}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='departureDate'>Departure Date</label>
                          <input
                            type='date'
                            className='form-control'
                            id='departureDate'
                            name='departureDate'
                            value={formData.departureDate}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='returnDate'>Return Date</label>
                          <input
                            type='date'
                            className='form-control'
                            id='returnDate'
                            name='returnDate'
                            value={formData.returnDate}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='numberOfPassengers'>
                            Number of Passengers
                          </label>
                          <input
                            type='number'
                            className='form-control'
                            id='numberOfPassengers'
                            name='numberOfPassengers'
                            value={formData.numberOfPassengers}
                            onChange={handleChange}
                            min='1'
                            required
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='cabinClass'>Cabin Class</label>
                          <select
                            className='form-control'
                            id='cabinClass'
                            name='cabinClass'
                            value={formData.cabinClass}
                            onChange={handleChange}
                            required
                          >
                            <option value='economy'>Economy</option>
                            <option value='business'>Business</option>
                            <option value='firstClass'>First Class</option>
                          </select>
                        </div>
                        <div className='form-group'>
                          <label htmlFor='specialRequests'>
                            Special Requests
                          </label>
                          <textarea
                            className='form-control'
                            id='specialRequests'
                            name='specialRequests'
                            value={formData.specialRequests}
                            onChange={handleChange}
                          />
                        </div>
                        <Button
                          variant='primary'
                          type='submit'
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Spinner />
                              Submitting...
                            </>
                          ) : (
                            'Submit'
                          )}
                        </Button>
                      </form>
                    </Modal.Body>
                  </Modal>
                </>
              </p>
            </Col>
            <Col
              sm={5}
              className='d-flex align-items-center justify-content-center'
            >
              <Image
                src={Quote}
                className='img-fluid'
                title='image'
                alt='image'
              />
            </Col>
          </Row>
        </Container>
      </section>
    </AppLayout>
  );
};
