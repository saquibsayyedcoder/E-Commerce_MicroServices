import dotenv from "dotenv";
dotenv.config(); // MUST be at top

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.routes.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(process.env.PORT || 5002, () => {
  console.log(`Product Service running on port ${process.env.PORT || 5002}`);
});
