// routes/chapterRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllChapters,
  getChaptersByCourse,
  createChapter,
  updateChapter,
  deleteChapter,
} = require("../chapters/chapters.controllers");

// Route to get all chapters
router.get("/", getAllChapters);

// Route to get chapters by course ID
router.get("/course/:courseId", getChaptersByCourse);

// Route to create a new chapter
router.post("/", createChapter);

// Route to update an existing chapter
router.put("/:chapterId", updateChapter);

// Route to delete a chapter
router.delete("/:chapterId", deleteChapter);

module.exports = router;
