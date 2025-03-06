import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { endPoint } from "../../APi/endPoint";
import SingleProduct from "../../Components/Product/SingleProduct";
import Loader from "../../Components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${endPoint}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <LayOut>
      {loading ? (
        <Loader />
      ) : (
        <SingleProduct
          data={product}
          flex={true}
          desc={true}
          renderAddToCart={true}
        />
      )}
    </LayOut>
  );
}

export default ProductDetail;
