import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createPayment, refundPayment } from "../controller/payment.controller.js";


const router = express.Router();

router.post("/pay", authenticate, createPayment);
router.post("/refund", authenticate, refundPayment);

export default router;
