const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const subscribe = new Schema({
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

const Subscribtion = model("Subscribtion", subscribe);

module.exports = Subscribtion;
