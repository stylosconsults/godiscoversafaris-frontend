import React from 'react';
import { Container, Row, Col, ResponsiveEmbed } from 'react-bootstrap';
import { ContactForm } from './ContactForm';
import search from '../../assets/assetss/search-icon.svg';
import facebook from '../../assets/assetss/facebook-icon.svg';
import tweeter from '../../assets/assetss/twitter-icon.svg';
import linkedin from '../../assets/assetss/linkedin-icon.svg';
import youtube from '../../assets/assetss/youtube-icon.svg';
import flickr from '../../assets/assetss/flickr-icon.svg';
import instagram from '../../assets/assetss/instagram-icon.svg';

function Contactinfo() {
  return (
    <section className='contact bg-light pt-4'>
      <Container>
        <Row>
          <Col sm={5}>
            <h1 className='text-title text-bold mt-3 py-4'> Get in Touch</h1>
            <div className='mt-4'>
              <div>
                <p className='text-sm font-semibold text-gray-500'>PHONE</p>
                <p className='mt-1 flex items-center text-lg text-gray-700'>
                  <i className='fa fa-phone mr-2'></i> +250 791 349 744
                </p>
                <hr className='mt-3 border-t border-gray-700' />
              </div>
<br/>
              <div>
                <p className='text-sm font-semibold text-gray-500'>EMAIL</p>
                <p className='mt-1 flex items-center text-lg text-gray-700'>
                  <i className='fa fa-envelope mr-2'></i>{' '}
                  info@godiscoverafrica.rw
                </p>
                <hr className='mt-3 border-t border-gray-700' />
              </div>
              <br/>
              <div>
                <p className='text-sm font-semibold text-gray-500'>ADDRESS</p>
                <p className='mt-1 flex items-center text-lg text-gray-700'>
                  <i className='fa fa-map-marker mr-2'></i> Kicukiro KK 366
                  Street, Kigali
                </p>
                <hr className='mt-3 border-t border-gray-700' />
              </div>
              <br/>
              <div className='flex items-center space-x-4'>
                <p className='text-sm font-semibold text-gray-500'>FOLLOW US</p>
                <div className='social-icons-container'>
                  <a href='https://www.facebook.com/godiscoverafricarw'>
                    <img
                      src={facebook}
                      alt='Facebook'
                      className='social-icon-img'
                    />
                  </a>
                  <a href='https://twitter.com/GodiscoverA'>
                    <img
                      src={tweeter}
                      alt='Twitter'
                      className='social-icon-img'
                    />
                  </a>
                  <a href='https://www.linkedin.com/in/godiscover-africa-your-tour-and-travel-partner-002207278'>
                    <img
                      src={linkedin}
                      alt='LinkedIn'
                      className='social-icon-img'
                    />
                  </a>
                  <a href='https://www.instagram.com/godiscoverafricarw/'>
                    <img
                      src={instagram}
                      alt='Instagram'
                      className='social-icon-img'
                    />
                  </a>
                </div>
              </div>
            </div>
          </Col>
          <Col
            sm={7}
            style={{ backgroundColor: '#065952' }}
            className='p-3 text-light rounded'
          >
            <ContactForm />
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col sm={12}>
            {/* <ResponsiveEmbed aspectRatio='16by9'> */}

            {/* <embed src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63799.99735817496!2d30.103524999999998!3d-1.9533690000000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc76b5e00aaa31b51!2sM%26M%20Plaza!5e0!3m2!1sen!2srw!4v1605274623851!5m2!1sen!2srw' /> */}
            {/* </ResponsiveEmbed> */}
          </Col>
        </Row>
      </Container>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15949.79002985189!2d30.1072021!3d-1.9752916!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca736cdf65d67%3A0x46ea187ff265ebe1!2sGoDiscover%20Safaris%20Ltd!5e0!3m2!1sen!2srw!4v1703686577031!5m2!1sen!2srw'
        width='100%'
        height='450'
        style={{ border: '0' }}
        allowFullScreen='true'
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
        title='Google Maps Embed'
      ></iframe>
    </section>
  );
}

export default Contactinfo;
