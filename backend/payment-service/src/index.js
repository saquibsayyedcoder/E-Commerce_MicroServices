import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import paymentRoutes from "./routes/payment.routes.js";
import { connectRabbitMQ } from "./utils/rabbitmq.js";

dotenv.config();
connectRabbitMQ();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/payments", paymentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Payment Service running on port ${process.env.PORT}`);
});
