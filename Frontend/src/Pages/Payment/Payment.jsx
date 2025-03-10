import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import SingleProduct from "../../Components/Product/SingleProduct";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurruncrFormat/CurrencyFormat";
import { instance } from "../../APi/axios";
import { BeatLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // console.log("Payment user:", user);
  // console.log("Payment basket:", basket);

  const totalItemOnCart = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [error, setError] = useState(null);
  const [payment, setPayment] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e);

    e?.error?.message ? setError(e?.error?.message) : setError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setPayment(true);
      // getting clientSecret from backend
      const response = await instance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      // conformation and getting card information
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log(paymentIntent);

      // save orders

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      dispatch({ type: type.EMPITY_BASKET });

      setPayment(false);
      navigate("/orders", { state: { msg: "New Order" } });
    } catch (error) {
      console.log(error);
      setPayment(false);
    }
  };

  return (
    <LayOut>
      <header className={classes.payment__header}>
        Checkout ({totalItemOnCart}) items
      </header>

      <div className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            {user && <div> {user.email} </div>}
            <div>1434 Adago Avenue</div>
            <div>Woldia, Ethiopia</div>
          </div>
        </div>

        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <SingleProduct data={item} flex={true} key={item.id || index} />
            ))}
          </div>
        </div>

        <hr />
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div>
            <div className={classes.payment__card__container}>
              <form onSubmit={handlePayment}>
                {error && <small style={{ color: "red" }}> {error} </small>}

                <CardElement onChange={handleChange} />

                <div>
                  <div>
                    <span>
                      Total Order <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {payment ? (
                      <div>
                        <BeatLoader size={5} />
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LayOut>
  );
}

export default Payment;
