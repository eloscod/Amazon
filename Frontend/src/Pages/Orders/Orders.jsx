import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import SingleProduct from "../../Components/Product/SingleProduct";
import classes from "./Orders.module.css";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <LayOut>
      <div className={classes.ordersContainer}>
        <div className={classes.ordersHeader}>
          <h2>Your Orders</h2>
          {orders.length === 0 && (
            <div className={classes.emptyMessage}>
              <h3>
                You have no orders yet. Add items to your cart and check out to
                see them here.
              </h3>
            </div>
          )}
        </div>

        <div>
          {orders.map((order, i) => {
            return (
              <div key={i} className={classes.singleOrder}>
                <p className={classes.orderId}>Order ID: {order.id}</p>
                <hr />
                {/* Render each product in this order's basket */}
                {order.data.basket?.map((product) => (
                  <SingleProduct flex={true} data={product} key={product.id} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </LayOut>
  );
}

export default Orders;
