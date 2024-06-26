const Course = require("../models/Course"); // Import your Course model
const getFirebaseImgUrl = require("../services/firebaseStorageService");
const User = require("../models/User");

const CourseController = {
  getAllCourses: async (req, res, next) => {
    try {
      const allCourses = await Course.find();
      res.status(200).json(allCourses);
    } catch (error) {
      next(error);
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
      next(error);
    }
  },
  getCourseByLevel: async (req, res, next) => {
    try {
      const courseClass = req.params.level;
      const course = await Course.find({ class: courseClass });
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  },

  createCourse: async (req, res, next) => {
    try {
      const createdBy = req.user.userId;

      const courseData = { ...req.body, createdBy };
      const existingCourse = await Course.findOne(courseData);

      if (existingCourse) {
        return res
          .status(400)
          .json({ error: "Course with similar details already exists." });
      }
      if (req.file) {
        const imageURL = await getFirebaseImgUrl(
          "courses-pic",
          req.file.path,
          req.file.originalname
        );
        courseData.image = imageURL;
      }

      const newCourse = await Course.create(courseData);
      await User.findOneAndUpdate(
        { _id: createdBy },
        { $push: { coursesCreated: newCourse } },
        { new: true }
      );
      res.status(201).json(newCourse);
    } catch (error) {
      next(error);
    }
  },

  updateCourse: async (req, res, next) => {
    try {
      const courseId = req.params.userId;
      const userId = req.user._id;

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      if (course.createdBy.toString() !== userId.toString()) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update this course" });
      }

      const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
        new: true,
      });
      res.status(200).json(updatedCourse);
    } catch (error) {
      next(error);
    }
  },

  deleteCourse: async (req, res, next) => {
    try {
      const courseId = req.params.id;
      const userId = req.user.userId;

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      if (course.createdBy.toString() !== userId.toString()) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this course" });
      }

      await Course.findByIdAndDelete(courseId);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },

  getMostSubscribedCourse: async (req, res, next) => {
    try {
      const mostSubscribedCourses = await Course.find()
        .sort({ subscribers: -1 })
        .limit(10)
        .populate("createdBy");

      if (!mostSubscribedCourses || mostSubscribedCourses.length === 0) {
        return res.status(404).json({ message: "No courses found" });
      }

      res.status(200).json(mostSubscribedCourses);
    } catch (error) {
      next(error);
    }
  },

  searchCoursesByTitle: async (req, res, next) => {
    try {
      let searchTerm = req.params.title;
      searchTerm = searchTerm.trim();
      const regex = new RegExp(searchTerm, "i"); // "i" for case-insensitive

      const courses = await Course.find({ Subject: regex });
      console.log("searchTerm: ", searchTerm);
      if (!courses || courses.length === 0) {
        // const user = await User.find({ fullName: regex });
        // console.log("the user: ", user);

        // const coursesByUsere = await Course.find({ createdBy: user._id });
        // console.log("coursesByUsere: ", coursesByUsere);
        // if (coursesByUsere) {
        //   res.status(200).json(coursesByUsere);
        // } else {
        return res.status(404).json({ message: "No courses found" });
        // }
      }

      res.status(200).json(courses);
    } catch (error) {
      console.error("Error in searchCoursesByTitle:", error);
      next(error); // Pass the error to the error handling middleware
    }
  },
};

module.exports = CourseController;
