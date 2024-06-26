// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateProfile,
  subscribeToCourse,
  getUserProfile,
} = require("../user/user.controllers");

const fileUpload = require("../middleware/FileUpload");
const auth = require("../middleware/Auth");
// User registration route
router.post("/register", fileUpload.single("profileImage"), register);

// User login route
router.post("/login", login);

router.get("/profile", auth, getUserProfile);

// Update user profile route
router.put("/update", fileUpload.single("profileImage"), auth, updateProfile);

//subscribe to courses
router.post("/subscribe/:courseId", auth, subscribeToCourse);

module.exports = router;
