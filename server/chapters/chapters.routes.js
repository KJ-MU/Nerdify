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
const auth = require("../middleware/Auth");
const fileUpload = require("../middleware/VideoUpload");
// Route to get all chapters
router.get("/", getAllChapters);

// Route to create a new chapter
router.post("/", fileUpload.single("videoUrl"), auth, createChapter);

// Route to get chapters by course ID
router.get("/course/:courseId", getChaptersByCourse);

// Route to update an existing chapter
router.put("/:chapterId", auth, updateChapter);

// Route to delete a chapter
router.delete("/:chapterId", auth, deleteChapter);

module.exports = router;
