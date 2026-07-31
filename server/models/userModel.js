import pool from "../config/db.js";

// Ensure userRegister table exists
const ensureTableExists = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS userRegister (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

// create a new user //
export const createnewUser = async (data) => {
  const { name, email, password } = data;
  await ensureTableExists();
  const result = await pool.query(
    `INSERT INTO userRegister (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *`,
    [name, email, password]
  );
  return result.rows[0];
};

