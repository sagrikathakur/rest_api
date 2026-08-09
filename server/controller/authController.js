import bcrypt from "bcrypt";
import { generateOtp, hashOtp, verifyOtpHash } from "../utils/otpHelper.js";
import { saveOtpHash, getLatestOtp, deleteOtpByEmail } from "../models/otpModel.js";
import { emailCheck, updateUserPassword } from "../models/userModel.js";
import { sendOtpEmail } from "../services/emailService.js";

/**
 * Controller: POST /auth/send-otp
 * Generates a 6-digit OTP, hashes it, stores hash + expiration in DB, and emails OTP to user.
 */
export const sendOtpController = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Generate 6-digit OTP
    const otp = generateOtp();

    // 2. Hash OTP
    const otpHash = hashOtp(otp);

    // 3. Set expiry time (10 minutes)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // 4. Store hash + expiry in database
    await saveOtpHash(email, otpHash, expiresAt);

    // 5. Send OTP to recipient email
    await sendOtpEmail(email, otp);

    return res.status(200).json({
      success: true,
      message: `OTP sent successfully to ${email}`,
      otp: otp,
    });
  } catch (error) {
    console.error("Send OTP Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while generating OTP",
    });
  }
};

/**
 * Controller: POST /auth/verify-otp
 * Verifies submitted OTP against stored hash and checks expiration.
 * Returns 400 if invalid or expired, 200 if valid.
 */
export const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 1. Fetch saved OTP record for email
    const savedOtpRecord = await getLatestOtp(email);

    if (!savedOtpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP. Please request a new code.",
      });
    }

    // 2. Check expiry
    const isExpired = new Date() > new Date(savedOtpRecord.expires_at);
    if (isExpired) {
      await deleteOtpByEmail(email);
      return res.status(400).json({
        success: false,
        message: "OTP code has expired. Please request a new code.",
      });
    }

    // 3. Hash/compare OTP
    const isValid = verifyOtpHash(otp, savedOtpRecord.otp_hash);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP code. Please check and try again.",
      });
    }

    // 4. Valid -> Delete OTP record to ensure single-use
    await deleteOtpByEmail(email);

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully!",
      verified: true,
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while verifying OTP",
    });
  }
};

/**
 * Controller: POST /auth/reset-password
 * Verifies submitted OTP and updates user's password in database.
 */
export const resetPasswordController = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // 1. Check if user exists
    const user = await emailCheck(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user account registered with this email address.",
      });
    }

    // 2. Retrieve latest active OTP record
    const savedOtpRecord = await getLatestOtp(email);
    if (!savedOtpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP code. Please request a new code.",
      });
    }

    // 3. Check expiry
    const isExpired = new Date() > new Date(savedOtpRecord.expires_at);
    if (isExpired) {
      await deleteOtpByEmail(email);
      return res.status(400).json({
        success: false,
        message: "OTP code has expired. Please request a new code.",
      });
    }

    // 4. Compare OTP hash
    const isValid = verifyOtpHash(otp, savedOtpRecord.otp_hash);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP code. Password reset failed.",
      });
    }

    // 5. Hash new password & update user record in database
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(email, hashedPassword);

    // 6. Delete OTP record
    await deleteOtpByEmail(email);

    return res.status(200).json({
      success: true,
      message: "Password reset successful! You can now log in with your new password.",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while resetting password",
    });
  }
};
