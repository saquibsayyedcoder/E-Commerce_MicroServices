import Payment from "../models/payment.model.js"
import axios from "axios";

// CREATE PAYMENT
export const createPayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    const payment = await Payment.create({
      orderId,
      userId: req.user.id,
      amount,
      status: "SUCCESS" // simulate success
    });

    // 🔁 Notify Order Service
    await axios.put(
      `${process.env.ORDER_SERVICE_URL}/api/orders/pay/${orderId}`,
      {},
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    res.status(201).json({
      message: "Payment successful",
      payment
    });
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
