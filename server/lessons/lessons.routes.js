// routes/lessonRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllLessons,
  getLessonsByChapter,
  createLesson,
  updateLesson,
  deleteLesson,
} = require("../lessons/lessons.controllers");
const videoUpload = require("../middleware/VideoUpload");
// Route to get all lessons
router.get("/", getAllLessons);

// Route to get lessons by chapter ID
router.get("/chapter/:chapterId", getLessonsByChapter);

// Route to create a new lesson
router.post("/", videoUpload.single("videoUrl"), createLesson);

// Route to update an existing lesson
router.put("/:lessonId", videoUpload.single("videoUrl"), updateLesson);

// Route to delete a lesson
router.delete("/:lessonId", deleteLesson);

module.exports = router;
