import React from 'react';
import 'dotenv/config';
import { Helmet } from 'react-helmet';
import { AppLayout } from '../../layouts';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { OurWork } from '../../components/section';

import './index.css';
import Contactinfo from '../contact/contactinfo';
// const { REACT_APP_ABOUT_VIDEO } = process.env;
export const About = () => {
  const boards = [
    {
      names: 'Mr. JOHN DOE',
      bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting ',
      role: 'Chairperson',
      image: 'https://picsum.photos/seed/picsum/200/300',
    },
    {
      names: 'Mr. JOHN DOE',
      bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting ',
      role: 'Chairperson',
      image: 'https://picsum.photos/seed/picsum/200/300',
    },
    {
      names: 'Mr. JOHN DOE',
      bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting ',
      role: 'Chairperson',
      image: 'https://picsum.photos/seed/picsum/200/300',
    },
    {
      names: 'Mr. JOHN DOE',
      bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting ',
      role: 'Chairperson',
      image: 'https://picsum.photos/seed/picsum/200/300',
    },
  ];
  return (
    <AppLayout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>About | GoDiscover Safaris</title>
        <link rel='canonical' href='https://godiscoverafrica.rw//about' />
        <meta name='description' content='GoDiscover Safaris' />
      </Helmet>
      <div className="home-body"></div>
      <section className='st-about-head pt-5 py-5 m-5 rounded-top' id={'who-we-are'}>
        <br />
        <br />
        <Container>
          <Row>
            <Col lg={12}>
              <p className='text-center head-title'>About us</p>
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col lg={4}>
              <p className='sub-head-title'>who we are</p>
            </Col>
            <Col lg={8}>
              <p className='about-description text-justify'>
              GoDiscover Safaris is a premium Tours and Travel company registered and headquartered in Kigali Rwanda, primarily operating inbound and outbound tours within Rwanda, East Safaris and Safaris as a whole. The company has also representatives in Nairobi, Kenya. 
                <br />
                <br />
                <br />
                We specialize in creating exceptional tourism experiences and our service is anchored on the root mandate which is to cater for all our client travel expectations by developing and facilitating tourism packages that offer adventure, mystery, tranquility, excitement, education and most important safety.
                <br />
                <br />
                Other services of the company include air ticketing, car rental services, events management and hotel booking services. The bookme.rw is a specialized portal owned and operated by the company and is dedicated for car rental and hotel booking services.  All our services, except air ticketing, can be booked and paid for online. The air ticketing service is done offline but you can contact us through the website, telephone or email for the service.

                <br />
                <br />
                We invite you to come to join the exciting GoDiscover Safaris adventures as we spread our wings across the continent of Safaris. Explore our detailed packages and itineraries which lead you to pre-arranged adventures or request for customized adventures and we will develop one for you that meets all your requirements. GoDiscover Safaris, we strive for style and comfort. 
              </p>
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col lg={4}>
              <p className='sub-head-title'>Mission</p>
            </Col>
            <Col lg={8}>
              <p className='about-description text-justify'>
                GoDiscover Safaris undertakes to provide our valued clients with
                top range exclusive service and end to end travel solutions
                right from airport pickups, transportation, accommodation,
                tours and all other aspects of your travel to ensure your peace
                and your comfort
              </p>
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col lg={4}>
              <p className='sub-head-title'>Vision</p>
            </Col>
            <Col lg={8}>
              <p className='about-description text-justify'>
                To become a preferable and leading safaris company in East
                Safaris by offering the best tours and travel and related
                activities at the most competitive price and providing quality
                services.
              </p>
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col lg={4}>
              <p className='sub-head-title'>Values</p>
            </Col>
            <Col lg={8}>
              <p className='about-description'>
                <ul>
                  <li className='about-description'>Empathy</li>
                  <li className='about-description'>Honest</li> 
                  <li className='about-description'>Integrity</li>
                  <li className='about-description'>Professionalism</li>
                  <li className='about-description'>Reliability</li>
                  <li className='about-description'>Transparent </li>
                  <li className='about-description'>Trust</li>
                 
                </ul>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <br/>
			<Contactinfo/>
    </AppLayout>
  );
};
