import express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { allOrders, cancelOrder, createOrder, markOrderPaid, myOrders, updateStatus } from "../controller/order.controller.js";



const router = express.Router();

router.post("/create-order", authenticate, createOrder);
router.get("/me", authenticate, myOrders);

router.get("/all-orders", authenticate, authorize(["ADMIN"]), allOrders);
router.put("/update/:id/status", authenticate, authorize(["ADMIN"]), updateStatus);
router.put("/cancel-order/:id", authenticate, cancelOrder);
router.put(
  "/pay/:id",
  authenticate,
  markOrderPaid
);

export default router;