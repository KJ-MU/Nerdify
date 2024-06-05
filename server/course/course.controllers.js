// controllers/courseController.js
const Course = require("../models/Course"); // Import your Course model

const CourseController = {
  getAllCourses: async (req, res, next) => {
    try {
      const allCourses = await Course.find();
      res.status(200).json(allCourses);
    } catch (error) {
      next();
    }
  },

  getCourseById: async (req, res, next) => {
    try {
      const courseId = req.params.id;
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(course);
    } catch (error) {
      next();
    }
  },

  createCourse: async (req, res, next) => {
    try {
      // const courseData = { ...req.body, createdBy };
      const courseData = { ...req.body };
      const existingCourse = await Course.findOne(courseData);

      if (existingCourse) {
        // If a similar course already exists, return an error response
        return res
          .status(400)
          .json({ error: "Course with similar details already exists." });
      }
      // const createdBy = req.user._id;

      const newCourse = await Course.create(courseData);

      res.status(201).json(newCourse);
    } catch (error) {
      next();
    }
  },

  updateCourse: async (req, res, next) => {
    try {
      const courseId = req.params.id;
      const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
        new: true,
      });
      res.status(200).json(updatedCourse);
    } catch (error) {
      next();
    }
  },

  deleteCourse: async (req, res, next) => {
    try {
      const courseId = req.params.id;
      await Course.findByIdAndDelete(courseId);
      res.status(204).end();
    } catch (error) {
      next();
    }
  },

  subscribeToCourse: async (req, res, next) => {
    try {
      const courseId = req.params.courseId;

      // const userId = req.user._id; // Assuming user ID is available in the request object
      const userId = req.body.userId;

      // Check if the course exists
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({ error: "Course not found." });
      }

      // Check if the user is already subscribed to the course
      if (course.subscribers.includes(userId)) {
        return res
          .status(400)
          .json({ error: "User is already subscribed to this course." });
      }

      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        { $addToSet: { subscribers: userId } }, // Update: Add userId to subscribers array if not already present
        { new: true } // Options: Return the updated document
      );

      res
        .status(200)
        .json({ message: "Successfully subscribed to the course." });
    } catch (error) {
      next();
    }
  },
};

module.exports = CourseController;
