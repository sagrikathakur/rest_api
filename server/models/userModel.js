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


