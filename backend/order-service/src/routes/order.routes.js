import express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { allOrders, createOrder, myOrders, updateStatus } from "../controller/order.controller.js";



const router = express.Router();

router.post("/create-order", authenticate, createOrder);
router.get("/me", authenticate, myOrders);

router.get("/all-orders", authenticate, authorize(["ADMIN"]), allOrders);
router.put("/update/:id/status", authenticate, authorize(["ADMIN"]), updateStatus);

export default router;