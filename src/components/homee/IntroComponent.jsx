import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import animal001 from '../../assets/assetss/gorillas.png';

const IntroComponent = () => {
  const [onScreen, setOnScreen] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (divRef.current) {
      observer.observe(divRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`w-100 px-5 py-5 text-light bg-light ${
        onScreen ? 'animate' : ''
      }`}
      ref={divRef}
    >
      <Row className='py-5'>
        <Col sm={12} md={6} className='pl-5 pr-0'>
          <img
            src={animal001}
            alt=''
            className='fade-image slide-in-right'
            style={{ borderRadius: '50%' }} /* Apply circular style directly */
            height={500}
            width={500}
          />
        </Col>
        <Col sm={12} md={6} className='text-col'>
          <h1 className='text-dark font-weight-bold text-center py-3 fade-in-title'>
            Experience Africa’s Wildlife Like Never Before!
          </h1>
          <h4 className='text-fade py-4 px-18 text-dark text-center fade-in-text'>
            At Go Discover Safaris, we specialize in creating personalized and
            unforgettable travel experiences across the continent. Whether
            you're seeking thrilling wildlife safaris, cultural immersion, or
            breathtaking landscapes, our expert local guides ensure every
            adventure is tailored just for you.
          </h4>
          <br />
          <div className='d-flex justify-content-center'>
            <Link to='/contact'>
              <button
                style={{
                  backgroundColor: '#065952',
                  borderColor: '#065952',
                  textAlign: 'center',
                }}
                className='text-white m-3 btn btn-lg animate__animated animate__pulse animate__infinite'
              >
                BOOK YOUR ADVENTURE
              </button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default IntroComponent;
