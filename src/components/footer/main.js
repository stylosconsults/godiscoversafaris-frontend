import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Partner } from '../partner';
import './index.css';
import { Subscribe } from '../../pages/maillist';
// import { Subscribe } from '../../pages/maillist';
export class Footer extends Component {
  render() {
    return (
      <footer>
        <Partner />
        <div className='ft-top py-2'>
        <Container className='py-4'>
            <Row className=''>
              <Col
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className='pt-2 pl-5 pr-5 mt-1'
              >
                <p className='text-normal'>
                  <p className=' title'>Contacts</p>
                  <p className='py-2'>
                    <i className='fa fa-phone mr-2'></i>+250 791 349 744{' '}
                    <br />
                    <i className='fa fa-inbox mr-2'></i>{' '}
                    info@godiscoverafrica.rw <br />
                  </p>

                  <p>
                    Kigali, Rwanda <br />
                    Kicukiro KK 366 Street <br />
                  </p>
                </p>
                <Link to='/contact'>
                  <Button
                    variant='default'
                    className='btn btn-custom-primary mt-3 text-light'
                  >
                    Contact us
                  </Button>
                </Link>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <p className='text-title text-center'>
                  Subscribe to our mailing list to receive tourism updates,
                  event notices, and publications.{' '}
                </p>
                <Subscribe />
              </Col>
            </Row>
          </Container>
          <Container fluid className='pl-5 pr-5'>
            <Row className='py-3 justify-content-center text-center'>
              <h2 className='mb-4 mt-3'>Useful Links</h2>
              <Col lg={12} className='text-light'>
                <a
                  href='https:/gov.rw/'
                  className='ft-link'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Republic of Rwanda'
                >
                  Bookme
                </a>
                &nbsp; | &nbsp;{' '}
                <a
                  href='https:/www.bookme.rw/'
                  className='ft-link'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Visit Rwanda'
                >
                  Car rental
                </a>
              </Col>
            </Row>
          </Container>
        </div>
        <div className='ft-bottom'>
          <Container fluid className='pl-5 pr-5'>
            <div className='py-4 border-top'>
              <Row>
                <Col lg={10}>
                  Copyright- GoDiscover Safaris &copy;{' '}
                  {new Date().getFullYear()}
                  &nbsp; | &nbsp;{' '}
                  <Link to='/' className='ft-link'>
                    Home
                  </Link>{' '}
                  &nbsp; | &nbsp;{' '}
                  <Link to='/about' className='ft-link'>
                    About Us
                  </Link>{' '}
                  &nbsp; | &nbsp;{' '}
                  <Link to='/contact' className='ft-link'>
                    Contact Us
                  </Link>{' '}
                  &nbsp; | &nbsp;{' '}
                  <Link to='/faq' className='ft-link'>
                    FAQs
                  </Link>
                  &nbsp; | &nbsp;{' '}
                  <Link to='/terms' className='ft-link'>
                    Terms & Conditions
                  </Link>{' '}
                  &nbsp; | &nbsp;{' '}
                  <Link to='/policy' className='ft-link'>
                    Privacy Policy
                  </Link>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </footer>
    );
  }
}
