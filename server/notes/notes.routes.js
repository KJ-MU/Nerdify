// routes/notesRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  getNotesByUser,
  createNote,
  updateNote,
  deleteNote,
} = require("../notes/notes.controllers");

// Route to get all notes
router.get("/", getAllNotes);

// Route to get notes by user ID
router.get("/user/:userId", getNotesByUser);

// Route to create a new note
router.post("/", createNote);

// Route to update an existing note
router.put("/:noteId", updateNote);

// Route to delete a note
router.delete("/:noteId", deleteNote);

module.exports = router;
