import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carousel.css';
import animal001 from '../../assets/assetss/gorillas.png';
import animal002 from '../../assets/assetss/Akagera-zebra.jpg';
import animal003 from '../../assets/assetss/giraffe.jpg';

function ImageCarousel() {
  const caption = (
    <Carousel.Caption className='carousel-caption-centered d-flex justify-content-center align-items-center'>
      <div className='text-center'>
        <h2 className='text-white m-5'>Explore East African Luxury Safaris</h2>
        <h1 className='text-white'>GORILLA TREKKING RWANDA</h1>
        <Link to="/contact">
        <button style={{backgroundColor:'#065952', borderColor:'#065952'}} className='m-3 btn btn-lg animate__animated animate__pulse animate__infinite'>
          BOOK YOU ADVENTURE
          </button>
        </Link>
      </div>
    </Carousel.Caption>
  );
  return (
    <Carousel fade controls={false} interval={3000} indicators={false}>
      <Carousel.Item>
        <img
          className='d-block w-100 carousel-img'
          src={animal001}
          alt='First slide'
        />
        {caption}
      </Carousel.Item>

      <Carousel.Item>
        <img
          className='d-block w-100 carousel-img'
          src={animal002}
          alt='Second slide'
        />
         {caption}
      </Carousel.Item>

      <Carousel.Item>
        <img
          className='d-block w-100 carousel-img'
          src={animal003}
          alt='Third slide'
        />
          {caption}
      </Carousel.Item>
    </Carousel>
  );
}

export default ImageCarousel;
