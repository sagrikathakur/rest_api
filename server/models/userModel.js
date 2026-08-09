import pool from "../config/db.js";

// create a user//
export const createRegister = async (data) => {
  const { name, email, password } = data;
  const result = await pool.query(
    `INSERT INTO userRegister (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email`,
    [name, email, password]
  );
  return result.rows[0];
};

// check if user email exists//
export const emailCheck = async (email) => {
  const result = await pool.query(
    `SELECT * FROM userRegister WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};
// get all //
export const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email FROM userRegister`
  );
  return result.rows;
};

// update user password //
export const updateUserPassword = async (email, hashedPassword) => {
  const result = await pool.query(
    `UPDATE userRegister SET password = $1 WHERE email = $2 RETURNING id, name, email`,
    [hashedPassword, email]
  );
  return result.rows[0];
};





