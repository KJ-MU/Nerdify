// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  getReviewsByUser,
  createReview,
  deleteReview,
} = require("../review/review.controllers");

// Route to get all reviews
router.get("/", getAllReviews);

// Route to get reviews by user ID
router.get("/user/:userId", getReviewsByUser);

// Route to create a new review
router.post("/", createReview);

// Route to delete a review
router.delete("/:reviewId", deleteReview);

module.exports = router;
