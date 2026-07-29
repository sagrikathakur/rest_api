import { Router } from "express";
import {
  createNotesController,
  getAllNotesController,
  getNotesByIdController,
  updateNotesController,
  deleteNotesController,
} from "../controller/product.controller.js";

const router = Router();

// Create a new note
router.post("/", createNotesController);

// Get all notes
router.get("/", getAllNotesController);

// Get note by ID
router.get("/:id", getNotesByIdController);

// Update note by ID
router.put("/:id", updateNotesController);

// Delete note by ID
router.delete("/:id", deleteNotesController);

export default router;