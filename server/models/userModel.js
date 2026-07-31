import pool from "../config/db";
// create a new user //
export const createnewUser = async (data) => {
  const { name, email, password } = data;
  const result = await pool.query(
    `INSERT INTO userRegister (name , email , password)
    VALUES ($1 , $2 , $3)
    RETURNING *
    `

    [name, email, password]
  )
  return result.rows[0]
}

