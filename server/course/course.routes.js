// routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  subscribeToCourse,
} = require("../course/course.controllers");

// Route to get all courses
router.get("/", getAllCourses);

// Route to get a single course by ID
router.get("/:id", getCourseById);

// Route to create a new course
router.post("/", createCourse);

// Route to update an existing course
router.put("/:id", updateCourse);

// Route to delete a course
router.delete("/:id", deleteCourse);

router.post("/courses/:courseId/subscribe", subscribeToCourse);
module.exports = router;
