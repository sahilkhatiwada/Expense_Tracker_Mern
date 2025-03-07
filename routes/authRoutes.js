import express from "express";
import { registerUser, loginUser, getUserInfo } from "../controllers/authController.js";
import { Protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser",Protect,getUserInfo);




export default router;