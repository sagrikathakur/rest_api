import {
  createNotes,
  getAllNotes,
  getNotesById,
  updateNotes,
  deleteNotes,
} from "../models/product.js";

// create note //
export const createNotesController = async (req, res) => {
  try {
    const noteIs = await createNotes(req.body);
    res.status(201).json(noteIs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all notes //
export const getAllNotesController = async (req, res) => {
  try {
    const notes = await getAllNotes();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get notes by id //
export const getNotesByIdController = async (req, res) => {
  try {
    const notes = await getNotesById(req.params.id);
    if (!notes) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update notes //
export const updateNotesController = async (req, res) => {
  try {
    const notes = await updateNotes(req.params.id, req.body);
    if (!notes) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete notes //
export const deleteNotesController = async (req, res) => {
  try {
    const notes = await deleteNotes(req.params.id);
    if (!notes) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};