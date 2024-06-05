// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateProfile,
  subscribeToCourse,
} = require("../user/user.controllers");

const fileUpload = require("../middleware/FileUpload");
// User registration route
router.post("/register", register);

// User login route
router.post("/login", login);

// Update user profile route
router.put(
  "/profile/:userId",
  fileUpload.single("profileImage"),
  updateProfile
);

//subscribe to courses
router.post("/subscribe/:courseId", subscribeToCourse);

module.exports = router;
