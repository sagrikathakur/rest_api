import pool from "../config/db.js";

// Add token to blacklist
export const blacklistToken = async (token, expiresAt) => {
  const result = await pool.query(
    `INSERT INTO blacklisted_tokens (token, expires_at)
     VALUES ($1, $2)
     ON CONFLICT (token) DO NOTHING
     RETURNING *`,
    [token, expiresAt]
  );
  return result.rows[0];
};

// Check if token is blacklisted
export const isTokenBlacklisted = async (token) => {
  const result = await pool.query(
    `SELECT id FROM blacklisted_tokens WHERE token = $1`,
    [token]
  );
  return result.rows.length > 0;
};
