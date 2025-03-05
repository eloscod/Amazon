import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import SingleProduct from "../../Components/Product/SingleProduct";
import CurrencyFormat from "../../Components/CurruncrFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from "./Cart.module.css";
import { type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
  const [{ basket }, dispatch] = useContext(DataContext);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <div className={classes.cartContainer}>
        {/* Left side: Cart items */}
        <div className={classes.cartMain}>
          <h1>Hello</h1>
          <h2>Your Shopping Basket</h2>
          <hr />
          <div className={classes.basketItems}>
            {basket.length === 0 ? (
              <h2>Your Basket is Empty</h2>
            ) : (
              basket.map((item, i) => {
                return (
                  <section key={i} className={classes.basketItemSection}>
                    <SingleProduct
                      data={item}
                      desc={true}
                      flex={true}
                      renderAddToCart={false}
                    />
                    <div className={classes.basketItemControls}>
                      <button onClick={() => increment(item)}>
                        <IoIosArrowUp size={20} />
                      </button>
                      <span>{item.amount}</span>
                      <button onClick={() => decrement(item.id)}>
                        <IoIosArrowDown size={20} />
                      </button>
                    </div>
                  </section>
                );
              })
            )}
          </div>
        </div>

        {/* Right side: Subtotal summary */}
        {basket?.length > 0 && (
          <div className={classes.subtotalSection}>
            <h2>Subtotal ({basket?.length} items)</h2>
            <CurrencyFormat amount={total} />
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Proceed to Checkout</Link>
          </div>
        )}
      </div>
    </LayOut>
  );
}

export default Cart;
