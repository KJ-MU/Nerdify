const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const user = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  accountType: {
    type: String,
  },
  school: {
    type: String,
    trim: true,
  },

  profileImage: {
    type: String,
    // default: 'default.jpg' // Default image filename
  },

  coursesSubscribed: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],

  coursesCreated: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",

    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: { type: String, minlength: 6 },
});

const User = model("User", user);

module.exports = User;
