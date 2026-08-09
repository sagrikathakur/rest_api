import express from "express";
import { 
  sendOtpController, 
  verifyOtpController, 
  resetPasswordController 
} from "../controller/authController.js";
import { validate } from "../middlewares/validate.js";
import { 
  sendOtpSchema, 
  verifyOtpSchema, 
  resetPasswordSchema 
} from "../validations/otpValidate.js";

const router = express.Router();

// Route: POST /auth/send-otp
router.post("/send-otp", validate(sendOtpSchema), sendOtpController);

// Route: POST /auth/verify-otp
router.post("/verify-otp", validate(verifyOtpSchema), verifyOtpController);

// Route: POST /auth/reset-password
router.post("/reset-password", validate(resetPasswordSchema), resetPasswordController);

export default router;
