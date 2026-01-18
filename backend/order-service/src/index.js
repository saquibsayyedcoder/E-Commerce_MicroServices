import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import orderRoutes from "./routes/order.routes.js"

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/orders", orderRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Order Service running on port ${process.env.PORT || 5003}`);

});