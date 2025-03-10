const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Message } = require("firebase-functions/pubsub");
dotenv.config();
const stripe = require("stripe")(process.env.VITE_STRIPE_KEY);

const app = express();

app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    Message: "success!",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);

  if (total > 0) {
    const paymentIntents = await stripe.paymentIntents.create({
      amount: total,
      currency: "USD",
    });

    res.status(201).json({
      clientSecret: paymentIntents.client_secret,
    });
  } else {
    res.status(403).json({
      massege: "Total is less than 0",
    });
  }
});

exports.api = onRequest(app);
