import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "../src/routes/auth.routes.js";
import { connectRabbitMQ } from "./utils/rabbitmq.js";

dotenv.config();
connectRabbitMQ();
const app = express();
app.use(cors());
app.use(express.json());

const CorsOrigin = [ 
 process.env.FRONTEND_URL,
  "http://localhost:5173",
]
app.use(
  cors({
    origin:CorsOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
     credentials: true, // Allow cookies and headers to be sent/received
  })
);

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Auth Service running on port ${process.env.PORT || 5000}`);
});
