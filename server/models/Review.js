const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const review = new Schema({
  text: {
    type: String,
    require: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  stars: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = model("Review", review);

module.exports = Review;
