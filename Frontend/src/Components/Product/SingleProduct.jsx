import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurruncrFormat/CurrencyFormat";
import classes from "./Products.module.css";
import { Link } from "react-router-dom";
import { type } from "../../Utility/action.type";
import { DataContext } from "../DataProvider/DataProvider";

function SingleProduct({ data, flex, desc, renderAddToCart }) {
  // Destructure the properties from data.
  // Note: The API returns rating as an object with "rate" and "count".
  const { id, image, title, rating, price, description } = data;

  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: type.ADD_TO_BASKET,
      item: {
        id,
        image,
        title,
        rating,
        price,
        description,
      },
    });
  };

  return (
    <div
      className={`${classes.card__container} ${
        flex ? classes.flex_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div>
        <h3>{title}</h3>
        {desc && <div style={{ maxWidth: "750px" }}> {description} </div>}
        <div className={classes.rating}>
          {/* Use rating.rate and rating.count for the actual rating value */}
          <Rating value={rating?.rate ?? 0} precision={0.1} readOnly />
          <small>{rating?.count ?? 0}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>

        {
          // If renderAddToCart is true, show the Add to Cart button
          renderAddToCart && (
            <button className={classes.button} onClick={addToCart}>
              Add to Cart
            </button>
          )
        }
      </div>
    </div>
  );
}

export default SingleProduct;
