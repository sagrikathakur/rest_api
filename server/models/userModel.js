import pool from "../config/db.js";



// create a new user //
export const createnewUser = async (data) => {
  const { name, email, password } = data;
  const result = await pool.query(
    `INSERT INTO userRegister (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id , name , email`,
    [name, email, password]
  );
  return result.rows[0];
};

// now to check if email already exists //

export const checkEmailExists = async (email) => {
  const result = await pool.query(
    `SELECT * FROM userRegister WHERE LOWER(email) = LOWER($1)`,
    [email.trim()]
  );
  return result.rows[0];
};