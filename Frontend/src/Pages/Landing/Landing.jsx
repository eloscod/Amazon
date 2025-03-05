import React from "react";
import LayOut from "../../Components/LayOut/LayOut";
import MyCarousel from "../../Components/Carousel/MyCarousel";
import Catagories from "../../Components/Catagory/Catagories";
import Products from "../../Components/Product/Products";

function Landing() {
  return (
    <LayOut>
      <MyCarousel />
      <Catagories />
      <Products />
    </LayOut>
  );
}

export default Landing;
