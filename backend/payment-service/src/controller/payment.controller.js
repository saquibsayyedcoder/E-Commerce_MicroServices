import Payment from "../models/payment.model.js"
import axios from "axios";
import { getChannel } from "../utils/rabbitmq.js";


// CREATE PAYMENT

export const createPayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    // save payment (MongoDB)
    const payment = await Payment.create({
      orderId,
      userId: req.user.id,
      amount,
      status: "SUCCESS"
    });

    // 🔥 publish event
    const channel = getChannel();
    channel.assertQueue("ORDER_PAID");

    channel.sendToQueue(
      "ORDER_PAID",
      Buffer.from(
        JSON.stringify({
          orderId,
          userId: req.user.id
        })
      )
    );

    res.json({ message: "Payment successful", payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const refundPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const payment = await Payment.findOne({ orderId });

    if (!payment)
      return res.status(404).json({ message: "Payment not found" });

    payment.status = "REFUNDED";
    await payment.save();

    res.json({ message: "Payment refunded", payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
