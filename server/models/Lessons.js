const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const lessons = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  videoUrl: {
    type: String,
  },

  chapter: {
    type: Schema.Types.ObjectId,
    ref: "Chapter",
  },
});

const Lessons = model("Lessons", lessons);

module.exports = Lessons;
