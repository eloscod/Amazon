import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleProduct from "./SingleProduct";
import classes from "./Products.module.css";
import Loader from "../Loader/Loader";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={classes.products__container}>
          {products.map((singleProduct) => (
            <SingleProduct
              data={singleProduct}
              key={singleProduct.id}
              renderAddToCart={true}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Products;
