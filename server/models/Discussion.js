const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    trim: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const discussionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [commentSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Discussion = model("Discussion", discussionSchema);

module.exports = Discussion;
