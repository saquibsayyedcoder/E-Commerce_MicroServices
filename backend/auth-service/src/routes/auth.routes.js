import express from "express";
import { login, logout, register } from "../controller/auth.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";




const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);


//protected route 
router.get("/me", authenticate, (req, res) =>{
    res.json({user: req.user});
});

//admin only
router.get("/admin", authenticate, authorize(["ADMIN"]), (req, res) => {
    res.json({message:"Admin access granted"})
});

export default router;