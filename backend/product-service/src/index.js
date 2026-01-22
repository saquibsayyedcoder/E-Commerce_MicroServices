import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import connectDB from "./config/db.js";
import { connectRabbitMQ } from "./utils/rabbitmq.js";
import { orderCreatedListener } from "./listeners/orderCreated.listener.js";
import { orderCancelledListener } from "./listeners/orderCancelled.listener.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = 5002;

const startServer = async () => {
  try {
    await connectRabbitMQ();
    await orderCreatedListener();
    await orderCancelledListener();

    app.listen(PORT, () => {
      console.log(`Product Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed", error);
    process.exit(1);
  }
};

startServer();
