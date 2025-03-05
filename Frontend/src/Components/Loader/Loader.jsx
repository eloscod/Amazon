import React from "react";
import { CircleLoader } from "react-spinners";
import classes from "./Loader.module.css";
function Loader() {
  return (
    <div className={classes.loaderContainer}>
      <CircleLoader color="#8c0037" />
    </div>
  );
}

export default Loader;
