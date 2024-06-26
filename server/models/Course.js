const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const course = new Schema({
  Subject: {
    type: String,
    required: true,
    trim: true,
  },

  class: {
    type: String, //for high school, college or others
  },
  overview: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  subscribers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  image: String,
});

const Course = model("Course", course);

module.exports = Course;
