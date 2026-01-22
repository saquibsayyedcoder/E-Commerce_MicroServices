import express from "express";
import dotenv from "dotenv";
import orderRoutes from "./routes/order.routes.js";
import { connectRabbitMQ } from "./utils/rabbitmq.js";
import { orderPaidListener } from "./listeners/orderPaid.listener.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 5003;

app.use("/api/orders", orderRoutes);

// ✅ IMPORTANT: async startup
const startServer = async () => {
  try {
    await connectRabbitMQ();     // 1️⃣ WAIT for RabbitMQ
    await orderPaidListener();   // 2️⃣ THEN start listener

    app.listen(PORT, () => {
      console.log(`Order Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed", error);
    process.exit(1);
  }
};

startServer();
