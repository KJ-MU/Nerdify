const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const notes = new Schema({
  text: {
    type: String,
    trim: true,
  },

  lesson: {
    type: Schema.Types.ObjectId,
    ref: "Lessons",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Notes = model("Notes", notes);

module.exports = Notes;
