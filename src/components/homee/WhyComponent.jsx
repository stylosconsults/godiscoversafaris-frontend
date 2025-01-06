import React, { useEffect, useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import animal001 from '../../assets/assetss/gorillas.png';

const WhyComponent = () => {
  const [onScreen, setOnScreen] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (divRef.current) {
      observer.observe(divRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`w-100 px-5 py-5 text-light bg-dark ${onScreen ? 'animate' : ''}`}
      ref={divRef}
    >
      <Row className='py-5'>
        <Col sm={12} md={6} className="text-col">
          <h1 className="text-light font-weight-bold text-center py-3 fade-in-title">
            Why It's Worth It
          </h1>
          <h4 className="text-fade px-18 text-light text-center fade-in-text">
            Most tourists skip through Kigali on their way to go gorilla trekking in other parts of Rwanda or nearby Uganda, but if you have the time, Kigali is an incredible, vibrant, and beautiful city known as the Singapore of Safaris. With a thriving arts scene and social conscience that includes the banning of plastic bags and monthly community city cleanups, Kigali is leading the way for many other cities in Africa and, indeed, around the world. —Helen Davies
          </h4>
        </Col>
        <Col sm={12} md={6}>
          <img
            src={animal001}
            alt=""
            className="fade-image slide-in-right"
            height={500}
          />
        </Col>
      </Row>
    </div>
  );
};

export default WhyComponent;
