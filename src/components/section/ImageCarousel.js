import React, { useState } from "react";
import './index.css';

export const ImageCarousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="custom-carousel">
      <img
        src={images[currentIndex]}
        className="img-fluid w-100"
        alt={`${title} - ${currentIndex + 1}`}
        style={{
          height: "250px",
          objectFit: "cover",
        }}
      />
      {images.length > 1 && (
        <>
          <button className="carousel-btn prev" onClick={goToPrevious}>
            ←
          </button>
          <button className="carousel-btn next" onClick={goToNext}>
            →
          </button>
          <div className="carousel-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
