import pool from "../config/db.js";

// Create User
export const createUsersModel = async (data = {}) => {
  const { name, email, age, gender } = data;

  const result = await pool.query(
    `INSERT INTO users (name, email, age, gender)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, email, age, gender]
  );

  return result.rows[0];
};

// Get All Users
export const getAllUsersModel = async () => {
  const result = await pool.query(
    `SELECT *
     FROM users
     ORDER BY id ASC`
  );

  return result.rows;
};

// Get User By ID
export const getUserByIdModel = async (id) => {
  const result = await pool.query(
    `SELECT *
     FROM users
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

// Update User
export const updateUsersModel = async (data = {}, id) => {
  const { name, email, age, gender } = data;

  const result = await pool.query(
    `UPDATE users
     SET
       name = $1,
       email = $2,
       age = $3,
       gender = $4
     WHERE id = $5
     RETURNING *`,
    [name, email, age, gender, id]
  );

  return result.rows[0];
};

// Delete User
export const deleteUsersModel = async (id) => {
  const result = await pool.query(
    `DELETE FROM users
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

// Search Users By Name
export const searchUsersModel = async (name) => {
  const result = await pool.query(
    `SELECT *
     FROM users
     WHERE name ILIKE $1
     ORDER BY id ASC`,
    [`%${name}%`]
  );

  return result.rows;
};