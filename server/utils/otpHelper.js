import crypto from "crypto";

/**
 * Generate a cryptographically secure 6-digit numeric OTP code (e.g. 483921)
 */
export const generateOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

/**
 * Hash an OTP code using SHA-256 digest
 * @param {string} otp 
 * @returns {string} hex hash string
 */
export const hashOtp = (otp) => {
  return crypto.createHash("sha256").update(otp.toString().trim()).digest("hex");
};

/**
 * Compare plain text OTP with stored SHA-256 hash
 * @param {string} otp 
 * @param {string} storedHash 
 * @returns {boolean} true if match
 */
export const verifyOtpHash = (otp, storedHash) => {
  if (!otp || !storedHash) return false;
  const candidateHash = hashOtp(otp);
  return crypto.timingSafeEqual(
    Buffer.from(candidateHash, "utf-8"),
    Buffer.from(storedHash, "utf-8")
  );
};
