import React from "react";
import { catagoryData } from "./catagoryData";
import SingleCatagory from "./SingleCatagory";
import classes from "./Catagories.module.css";

function Catagories() {
  return (
    <div className={classes.Catagories__container}>
      {catagoryData.map((item) => (
        <SingleCatagory key={item.id} data={item} />
      ))}
    </div>
  );
}

export default Catagories;
