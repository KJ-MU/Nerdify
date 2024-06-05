// controllers/reviewController.js
const Review = require("../models/Review"); // Import your Review model

const ReviewController = {
  getAllReviews: async (req, res, next) => {
    try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
    } catch (error) {
      next();
    }
  },

  getReviewsByUser: async (req, res, next) => {
    try {
      const userId = req.params.userId;
      console.log(userId);
      const reviews = await Review.findOne({ user: userId });
      console.log(reviews);
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  },

  createReview: async (req, res, next) => {
    try {
      const { courseId, userId, text } = req.body;
      const existingReview = await Review.findOne({
        course: courseId,
        user: userId,
      });

      if (existingReview) {
        return res
          .status(400)
          .json({ error: "User has already reviewed this course." });
      }

      const savedReview = await Review.create({
        course: courseId,
        user: userId,
        text: text,
      });
      res.status(201).json(savedReview);
    } catch (error) {
      next(error);
    }
  },

  deleteReview: async (req, res, next) => {
    try {
      const reviewId = req.params.reviewId;
      await Review.findByIdAndDelete(reviewId);
      res.status(204).end();
    } catch (error) {
      next();
    }
  },
};

module.exports = ReviewController;
