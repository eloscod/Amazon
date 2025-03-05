import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SliderData } from "./Images/Data";
import classes from "./Carousel.module.css";

function MyCarousel() {
  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
      >
        {SliderData.map((image, i) => (
          <div key={i} className={classes.carouselSlide}>
            <img src={image} alt={`carousel slide ${i + 1}`} />
          </div>
        ))}
      </Carousel>
      <div className={classes.hero__img}></div>
    </>
  );
}

export default MyCarousel;
