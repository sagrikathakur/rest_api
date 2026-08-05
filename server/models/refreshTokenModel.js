import pool from "../config/db.js";

// Save a new refresh token
export const createRefreshToken = async (userId, token, expiresAt) => {
  const result = await pool.query(
    `INSERT INTO refresh_tokens (user_id, token, expires_at)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, token, expiresAt]
  );
  return result.rows[0];
};

// Find a refresh token
export const findRefreshToken = async (token) => {
  const result = await pool.query(
    `SELECT * FROM refresh_tokens WHERE token = $1`,
    [token]
  );
  return result.rows[0];
};

// Revoke a specific refresh token
export const revokeRefreshToken = async (token) => {
  const result = await pool.query(
    `UPDATE refresh_tokens 
     SET is_revoked = TRUE 
     WHERE token = $1 
     RETURNING *`,
    [token]
  );
  return result.rows[0];
};

// Revoke all refresh tokens for a user (Global Logout)
export const revokeAllUserTokens = async (userId) => {
  const result = await pool.query(
    `UPDATE refresh_tokens 
     SET is_revoked = TRUE 
     WHERE user_id = $1 
     RETURNING *`,
    [userId]
  );
  return result.rows;
};
