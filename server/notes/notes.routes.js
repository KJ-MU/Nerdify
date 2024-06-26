const express = require("express");
const router = express.Router();
const {
  createNote,
  updateNote,
  getNotesByUserAndLesson,
} = require("./notes.controllers");
const auth = require("../middleware/Auth");

// Route to create a new note
router.post("/", auth, createNote);

// Route to get notes by user and lesson
router.get("/:lessonId", auth, getNotesByUserAndLesson);

module.exports = router;
