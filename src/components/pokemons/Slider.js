import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const Slider = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const length = 4;

  const nextSlide = () => {
    setCurrent(current === length ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length : current - 1);
  };

  return (
    <div className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {images &&
        Object.keys(images).map((slide, index) => {
          {
            if (index <= 4)
              return (
                <div
                  className={index === current ? "slide active-slide" : "slide"}
                  key={index}
                >
                  {index === current && (
                    <img
                      src={images[slide]}
                      alt="pokemon image"
                      className="image"
                    />
                  )}
                </div>
              );
          }
        })}
    </div>
  );
};

export default Slider;
