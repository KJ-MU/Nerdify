const Review = require("../models/Review");
const Course = require("../models/Course");

const ReviewController = {
  // Get reviews by course ID
  getReviewsByCourse: async (req, res, next) => {
    try {
      const courseId = req.params.courseId;

      const courseReviews = await Review.find({ course: courseId }).populate(
        "user"
      );

      if (!courseReviews) {
        res.status(404).json({ message: "you have no reviews yet!" });
      }
      res.status(200).json(courseReviews);
    } catch (error) {
      next(error);
    }
  },

  // Create a new review
  createReview: async (req, res, next) => {
    try {
      const { text, stars, course } = req.body;
      const userId = req.user.userId;

      // Check if course exists
      const courseExists = await Course.findById(course);

      if (!courseExists) {
        return res.status(404).json({ error: "Course not found" });
      }

      // Create and save the new review
      const newReview = await Review.create({
        text,
        stars,
        course,
        user: userId,
      });

      const newReviewWithUser = await Review.findById(newReview._id).populate(
        "user"
      );
      res.status(201).json(newReviewWithUser);
    } catch (error) {
      next(error);
    }
  },

  // Delete a review
  deleteReview: async (req, res, next) => {
    try {
      const reviewId = req.params.reviewId;
      const userId = req.user.userId;

      // Find the review by ID
      const review = await Review.findById(reviewId);
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }

      // Check if the review belongs to the user
      if (review.user.toString() !== userId.toString()) {
        return res.status(403).json({
          error: "Unauthorized: You are not the owner of this review",
        });
      }

      // Delete the review
      await Review.findByIdAndDelete(reviewId);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ReviewController;
