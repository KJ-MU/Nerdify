const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const teacher = new Schema({
  Courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Teacher = model("Teacher", teacher);

module.exports = Teacher;
