// routes/lessonRoutes.js
const express = require("express");
const router = express.Router();
const {
  getLessonsById,
  getLessonsByChapter,
  createLesson,
  updateLesson,
  deleteLesson,
} = require("../lessons/lessons.controllers");
const auth = require("../middleware/Auth");
const videoUpload = require("../middleware/VideoUpload");
// Route to get all lessons
router.get("/:lessonId", getLessonsById);

// Route to get lessons by chapter ID
router.get("/chapter/:chapterId", getLessonsByChapter);

// Route to create a new lesson
router.post("/:chapterId", auth, videoUpload.single("videoUrl"), createLesson);

// Route to update an existing lesson
router.put("/:lessonId", auth, videoUpload.single("videoUrl"), updateLesson);

// Route to delete a lesson
router.delete("/:lessonId", auth, deleteLesson);

module.exports = router;
