import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: Number,
      required: true
    },
    userId: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"],
      default: "PENDING"
    },
    method: {
      type: String,
      default: "CARD"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
