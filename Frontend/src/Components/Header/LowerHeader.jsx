import React from "react"; // Imports React library
import { CgMenu } from "react-icons/cg"; // Menu icon from react-icons
import classes from "./LowerHeader.module.css"; // CSS module for styling

function LowerHeader() {
  return (
    <>
      {/* Container for the lower navigation bar */}
      <div className={classes.lower__container}>
        <ul>
          {/* First list item with a menu icon and "All" label */}
          <li>
            <CgMenu />
            <p>All</p>
          </li>
          {/* Additional navigation links */}
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

export default LowerHeader; // Exports the LowerHeader component
