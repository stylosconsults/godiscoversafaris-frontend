import React, { useEffect, useState } from 'react';
import { AppLayout } from '../../layouts';
import './index.css';
import 'animate.css';
import { LatestTours } from '../section';
import WhyComponent from './WhyComponent';
import ImageCarousel from './Carousel';
import IntroComponent from './IntroComponent';
import Contactinfo from '../../pages/contact/contactinfo';

const HomeBody = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    // Change the animation class when the currentIndex updates
    setFadeClass('fade-in');
  }, [currentIndex]);

  const handleSelect = (selectedIndex) => {
    setFadeClass('fade-out'); // Apply fade-out class
    setTimeout(() => {
      setCurrentIndex(selectedIndex); // Update the index after fade-out
    }, 500); // Adjust timeout to match fade-out duration
  };
  return (
    <AppLayout>
      <div>
        <ImageCarousel />
        {/* <Carousel activeIndex={currentIndex} onSelect={handleSelect} slide={false} interval={3000}>
      {servicesData.map((service, index) => (
        <Carousel.Item key={index} className={`carousel-item ${fadeClass}`}>
          <div className='carousel-overlay'></div>
          <img src={[animal003, airplane, convention, cars][index]} alt='' className='carousel-image' />
          <Carousel.Caption className='carousel-caption'>
            <h3 className='text-light font-weight-bold'>{service.title}</h3>
            <p className='text-light'>{service.description}</p>
            <Link to={service.link}>
              <Button className='bg-transparent border-light btn-custom-primary'>
                Learn more <ArrowRightCircle />{' '}
              </Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel> */}
        <WhyComponent />
        <IntroComponent />
        <div className='px-5'>

          <br />
          <br />
          <LatestTours isHome={true} />
          <br />
          <br />
        </div>
      </div>
      <br/>
	  <Contactinfo/>
    </AppLayout>
  );
};

export default HomeBody;
