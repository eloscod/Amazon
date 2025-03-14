import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { endPoint } from "../../APi/endPoint";
import SingleProduct from "../../Components/Product/SingleProduct";
import classes from "./Results.module.css";
import Loader from "../../Components/Loader/Loader";

function Results() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categoryName } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${endPoint}/products/category/${categoryName}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("API Error", err);
        setLoading(false);
      });
  }, [categoryName]);

  return (
    <LayOut>
      {loading ? (
        <Loader />
      ) : (
        <div className={classes.resultsContainer}>
          <div className={classes.resultsHeader}>
            <h1>Results</h1>
            <p>Category / {categoryName}</p>
            <hr />
          </div>

          <div className={classes.resultsGrid}>
            {products?.map((product) => (
              <SingleProduct
                key={product.id}
                data={product}
                renderAddToCart={true}
              />
            ))}
          </div>
        </div>
      )}
    </LayOut>
  );
}
export default Results;
