import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Product Service running"));

app.listen(process.env.PORT || 5001, () => {
  console.log(`Product Service running on port ${process.env.PORT || 5001}`);
});
