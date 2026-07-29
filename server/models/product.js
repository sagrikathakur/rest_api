import pool from "../config/db.js";

// Create Note
export const createNotes = async (data) => {
  const { title, content } = data;

  const result = await pool.query(
    `INSERT INTO notes (title, content)
     VALUES ($1, $2)
     RETURNING *`,
    [title, content]
  );

  return result.rows[0];
};

// get all notes //

export const getAllNotes = async () => {
  const result = await pool.query(
    `SELECT * FROM notes ORDER BY id DESC`,
  )
  return result.rows;
}

// get notes by id //
export const getNotesById = async (id) => {
  const result = await pool.query(`SELECT * FROM notes WHERE id = $1`, [id]);
  return result.rows[0];
}
// update notes //
export const updateNotes = async (id, data) => {
  const { title, content } = data;
  const result = await pool.query(`UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *`, [title, content, id]);
  return result.rows[0];
}

// delete notes//
export const deleteNotes = async (id) => {
  const result = await pool.query(
    `DELETE FROM notes WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};