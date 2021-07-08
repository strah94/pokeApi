import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const Galery = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const length = images && images.length;

  useEffect(() => {
    // console.log(images["back_default"]);
    // Object.keys(images).map((slide, index) => {
    //   console.log(images[slide]);
    // });
  }, [images]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <div className="galery">
      {/* <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {Object.keys(images).map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img src={images[slide]} alt="pokemon image" className="image" />
            )}
          </div>
        );
      })} */}
      <h1 style={{ color: "white", position: "absolute" }}>GALERY WORKS</h1>
    </div>
  );
};

export default Galery;
