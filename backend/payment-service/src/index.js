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

const CorsOrigin = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
]
app.use(
  cors({
    origin: CorsOrigin, // Allow the frontend to make requests
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies and headers to be sent/received
  })
);

app.use("/api/payments", paymentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Payment Service running on port ${process.env.PORT}`);
});
