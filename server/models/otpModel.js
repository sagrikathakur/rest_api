import pool from "../config/db.js";

// Ensure OTP table exists on server start
export const initOtpTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS otps (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        otp_hash VARCHAR(255) NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("OTPs database table initialized successfully.");
  } catch (error) {
    console.error("Error initializing OTPs table:", error.message);
  }
};

// Store hash and expiration for an email (replaces prior pending OTPs)
export const saveOtpHash = async (email, otpHash, expiresAt) => {
  // Delete existing OTP entries for this email
  await pool.query(`DELETE FROM otps WHERE email = $1`, [email]);

  // Insert new OTP hash and expiration
  const result = await pool.query(
    `INSERT INTO otps (email, otp_hash, expires_at)
     VALUES ($1, $2, $3)
     RETURNING id, email, expires_at, created_at`,
    [email, otpHash, expiresAt]
  );
  return result.rows[0];
};

// Get latest active OTP entry for an email
export const getLatestOtp = async (email) => {
  const result = await pool.query(
    `SELECT * FROM otps WHERE email = $1 ORDER BY created_at DESC LIMIT 1`,
    [email]
  );
  return result.rows[0];
};

// Remove OTP after successful verification or expiration cleanup
export const deleteOtpByEmail = async (email) => {
  await pool.query(`DELETE FROM otps WHERE email = $1`, [email]);
};
