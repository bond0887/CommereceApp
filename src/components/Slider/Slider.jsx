import { useState, useEffect } from "react";
import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined } from "@mui/icons-material";
// import { sliderData } from "./Slider-data";
import "./Slider.scss";
import { NavLink } from "react-router-dom";

import { Button } from "@mui/material";

const Slider = ({ products, seeDetails }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = products.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <div className="slider">
      <ArrowCircleLeftOutlined className="arrow prev" onClick={prevSlide} />
      <ArrowCircleRightOutlined className="arrow next" onClick={nextSlide} />
      {products.map((slide, index) => {
        return (
          <div
            className={index === currentSlide ? "slide current" : "slide"}
            key={index}
          >
            {index === currentSlide && (
              <div>
                <NavLink to='/productdetails'><img src={slide.image.url} alt="slide" onClick={() => seeDetails(slide.id)} className="image" /> </NavLink>
                <div className="content">
                  <h2>{slide.name}</h2>
                  <p>{slide.description.slice(3,-4)}</p>
                  {/* <Button className="--btn --btn-primary" style={{cursor: 'pointer'}} component={Link} to='/productdetails' variant="contained" color="secondary" onClick={() => seeDetails(slide.id)}>View Product</Button> */}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;