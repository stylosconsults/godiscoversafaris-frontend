import React, { useState } from 'react';
import { AppLayout } from '../../layouts';
import {
  Container,
  Row,
  Col,
  ResponsiveEmbed,
  Form,
  Alert,
  Button,
  Image
} from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Loading from '../../utils/Loading';
import cars from '../../../src/assets/assetss/cars.jpeg';

import './index.css';

export const RentalCar = () => {
  const bookmeUrl = 'https://carrental.bookme.rw/';
  return (
    <AppLayout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>RentCar | GoDiscover Safaris</title>
        <link rel='canonical' href='https://godiscoverafrica.rw/carrental' />
        <meta
          name='description'
          content='RentCar GoDiscover Safaris on the following address: email: ‎+250 791 349 744, email: info@godiscoverafrica.rw '
        />
      </Helmet>
      <section className='contact bg-light pt-4'>
        <Container>
          <Row className='justify-content-center'>
            <Col sm={7}>
              <h1 className='text-title text-bold mt-3 py-4'>Car rental</h1>
              <p className='mt-4'>
                <br />
                Discover convenience and freedom with our premier car rental
                service. Choose from a well-maintained fleet for weekend
                getaways or business trips. Enjoy hassle-free booking and
                competitive rates. Elevate your journey.
                <br />– rent a car with us today!
              </p>
              <p className='mt-4'>
                <i className='fa fa-phone mr-2'></i> ‎+250 791 349 744 <br />
                <i className='fa fa-inbox mr-2'></i> info@godiscoverafrica.rw{' '}
                <br />
              </p>
              <p>
              <a href={bookmeUrl} target="_blank" rel="noopener noreferrer" className=''>
              <Button
                type='submit'
                variant='outline-primary'
                className='btn-lg'
              >
                <i className='fa fa-save'></i> Go to Car rental portal
              </Button>
              </a>
              </p>
            </Col>
            <Col
              sm={5}
              className='d-flex align-items-center justify-content-center'
            >
                 <Image
										src={cars}
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
