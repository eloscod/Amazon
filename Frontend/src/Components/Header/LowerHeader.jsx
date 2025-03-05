import React from "react";
import { CgMenu } from "react-icons/cg";
import classes from "./LowerHeader.module.css";

function LowerHeader() {
  return (
    <>
      <div className={classes.lower__container}>
        <ul>
          <li>
            <CgMenu />
            <p>All</p>
          </li>
          <li>Today's Deals</li>
          <li>Customer Service</li>
          <li>Registry</li>
          <li>Gift Cards</li>
          <li>Sell</li>
        </ul>
      </div>
    </>
  );
}

export default LowerHeader;
