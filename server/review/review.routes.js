const express = require("express");
const router = express.Router();
const {
  getReviewsByCourse,
  createReview,
  deleteReview,
} = require("./review.controllers");
const auth = require("../middleware/Auth");
const fileUplaod = require("../middleware/FileUpload");
// Route to get reviews by course ID
router.get("/course/:courseId", getReviewsByCourse);

// Route to create a new review
router.post("/", auth, fileUplaod.single("image"), createReview);

// Route to delete a review
router.delete("/:reviewId", auth, deleteReview);

module.exports = router;
