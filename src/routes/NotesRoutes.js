import express from "express";
import { protect } from "../middleware/protect.js";
import { createNote, getNotes, updateNote, deleteNote } from "../controllers/NotesController.js";

const router = express.Router();

router.post("/createNote", protect, createNote);
router.get("/getNotes", protect, getNotes);
router.put("/updateNote/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

export default router;
