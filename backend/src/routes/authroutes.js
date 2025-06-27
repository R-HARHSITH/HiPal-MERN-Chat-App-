import express from 'express';
// import { signup,login,logout,verifyOtp,resendOtp } from '../controllers/authcontroller.js';
import { signup,login,logout,updateProfile, checkAuth} from '../controllers/authcontroller.js';
import { protectRoute } from '../middlewares/authmiddleware.js';

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
// router.post("/verify-otp",verifyOtp);
// router.post("/resend-otp",resendOtp);
router.put("/update-profile",protectRoute,updateProfile);
router.get("/check",protectRoute,checkAuth);

export  default router;