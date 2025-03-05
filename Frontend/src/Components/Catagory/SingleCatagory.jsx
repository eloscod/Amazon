import React from "react";
import classes from "./Catagories.module.css";
import { Link } from "react-router-dom";
function SingleCatagory({ data }) {
  const { title, img } = data;
  return (
    <div className={classes.catagories}>
      <Link to={`/category/${data.category}`}>
        <span>
          <h2>{title}</h2>
        </span>
        <img src={img} alt="" />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default SingleCatagory;
