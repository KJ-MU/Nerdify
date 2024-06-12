// controllers/userController.js
const User = require("../models/User"); // Import your User model
const Course = require("../models/Course"); // Import your User model

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const { log } = require("console");
const getFirebaseImgUrl = require("../services/firebaseStorageService");
//////////////

///////////////////////////////

const UserController = {
  register: async (req, res, next) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
      const { fullName, accountType, school, email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Create a new user
      const newUser = await User.create({
        fullName,
        accountType,
        school,
        email,
        password,
      });
      const payload = {
        email: newUser.email,
        id: newUser.id,
        fullname: newUser.fullName,
      };
      const token = jwt.sign(payload, process.env.secret_key);

      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.secret_key
      );

      res.status(201).json(token);
    } catch (error) {
      next();
    }
  },

  updateProfile: async (req, res, next) => {
    try {
      const id = req.params.userId;
      // Check if the user exists
      const existingUser = await User.findById(id);

      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if the email is being updated and if it conflicts with existing emails
      if (req.body.email && req.body.email !== existingUser.email) {
        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
          return res.status(400).json({
            error:
              "A user with this email already exists. Please choose another email.",
          });
        }
      }

      let updatedUserData = { ...req.body };
      console.log("req.file", req.file);
      // Handle image upload if a new image is provided
      if (req.file) {
        const imageURL = await getFirebaseImgUrl(
          "profile-pic",
          req.file.path,
          req.file.originalname
        );
        console.log("imageURL" + imageURL);

        updatedUserData.profileImage = imageURL;
      }
      // Update the user's information
      const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
        new: true,
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      next();
    }
  },

  subscribeToCourse: async (req, res, next) => {
    try {
      const userId = req.user._id; // Get the ID of the authenticated user
      const courseId = req.params.courseId;

      // Check if the user is already subscribed to the course
      const user = await User.findById(userId);
      if (user.coursesSubscribed.includes(courseId)) {
        return res
          .status(400)
          .json({ error: "User is already subscribed to this course" });
      }

      // Find the course by ID
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      // Update the user document to add the course to the coursesSubscribed array
      user.coursesSubscribed.push(courseId);
      await user.save();

      res
        .status(200)
        .json({ message: "Successfully subscribed to the course" });
    } catch (error) {
      next();
    }
  },
};

module.exports = UserController;
