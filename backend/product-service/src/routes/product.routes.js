import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, reduceStock, updateProduct } from "../controller/product.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/get-product", getProducts);
router.get("/get-product-by-id/:id", getProductById);
router.get("/get-all", getProducts);
router.post("/createProduct", authenticate, authorize(["ADMIN"]), createProduct);
router.put("/update/:id", authenticate, authorize(["ADMIN"]), updateProduct);
router.delete("/delete/:id", authenticate, authorize(["ADMIN"]), deleteProduct);
//reduce stock
router.put(
  "/reduce-stock/:id",
  authenticate,
  authorize(["ADMIN"]),
  reduceStock
);


export default router;