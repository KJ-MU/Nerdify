const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const chapter = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
});

const Chapter = model("Chapter", chapter);

module.exports = Chapter;
