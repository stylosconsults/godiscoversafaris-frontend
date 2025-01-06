import React, { useState } from 'react';
import { AppLayout } from '../../layouts';
import { Link } from "react-router-dom";
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
import accom from '../../../src/assets/assetss/accomodations.avif';

import './index.css';

export const Accommodation = () => {
  const bookmeUrl = 'https://bookme.rw/';
  return (
    <AppLayout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Accommodation | GoDiscover Safaris</title>
        <link rel='canonical' href='https://godiscoverafrica.rw//contact' />
        <meta
          name='description'
          content='Accommodation GoDiscover Safaris on the following address: email: ‎+250 791 349 744, email: info@godiscoverafrica.rw '
        />
      </Helmet>
      <section className='contact bg-light pt-4'>
        <Container>
          <Row className='justify-content-center'>
            <Col sm={7}>
              <h1 className='text-title text-bold mt-3 py-4'>Accommation</h1>
              <p className='mt-4'>
                <br />
                Discover a home away from home! Our cozy accommodation provide comfort and convenience for your stay. We partner with all sort of accommodation facilities, budget, mid-range and high end town hotels, resorts as well as luxury lodges. We offer a good range of apartment hotels, serviced apartments, motels, guesthouses and tented camps. Whether you're traveling for business or leisure, our carefully selected partners will offer you a perfect blend of style and comfort. Book your stay with us and experience hospitality at its finest. For booking visit our hotel booking dedicated portal bookme.rw.  
                <br/>
                <br />– Book with us!
              </p>
              <p className='mt-4'>
                <i className='fa fa-website mr-2'></i>www.bookme.rw <br />
                <i className='fa fa-phone mr-2'></i>+250 791 349 744 <br />
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
                <i className='fa fa-save'></i> Go to Bookme portal
              </Button>
            </a>
              </p>

            </Col>
            <Col
              sm={5}
              className='d-flex align-items-center justify-content-center'
            >
               <Image
										src={accom}
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
