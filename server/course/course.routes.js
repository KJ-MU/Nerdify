const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getMostSubscribedCourse,
  searchCoursesByTitle,
  getCourseByLevel,
} = require("../course/course.controllers");

const auth = require("../middleware/Auth");
const fileUpload = require("../middleware/FileUpload");

router.get("/search/:title", searchCoursesByTitle);
// Route to get all courses
router.get("/", getAllCourses);
router.get("/level/:level", getCourseByLevel);

router.get("/most-subscribed", getMostSubscribedCourse);

// Route to get a single course by ID
router.get("/:id", getCourseById);

// Route to get most subscribed courses

// Route to create a new course
router.post("/", auth, fileUpload.single("image"), createCourse);

// Route to update an existing course
router.put("/:id", auth, updateCourse);

// Route to delete a course
router.delete("/:id", auth, deleteCourse);

module.exports = router;
