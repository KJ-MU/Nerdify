// controllers/lessonController.js
const Lessons = require("../models/Lessons");
const Chapters = require("../models/Chapters");
const Course = require("../models/Course");
const getFirebaseImgUrl = require("../services/firebaseStorageService");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const { log } = require("console");
const validateCourseOwner = async (ownerId, ChapterId) => {
  try {
    const chapter = await Chapters.findById(ChapterId);
    const courseId = chapter.course;
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    if (course.createdBy.toString() !== ownerId) {
      throw new Error("Unauthorized: You are not the owner of this course");
    }

    return true;
  } catch (error) {
    console.error("Error validating course ownership:", error.message);
    throw error;
  }
};
const LessonController = {
  getLessonsById: async (req, res, next) => {
    try {
      const lessonId = req.params.lessonId;
      const allLessons = await Lessons.findById(lessonId);
      res.status(200).json(allLessons);
    } catch (error) {
      next();
    }
  },

  getLessonsByChapter: async (req, res, next) => {
    try {
      const chapterId = req.params.chapterId;
      const chapterLessons = await Lessons.find({ chapter: chapterId });
      res.status(200).json(chapterLessons);
    } catch (error) {
      next();
    }
  },

  createLesson: async (req, res, next) => {
    try {
      const chapterId = req.params.chapterId;
      const userId = req.user.userId;
      const isOwner = await validateCourseOwner({ userId, chapterId });

      if (!isOwner) {
        return res.status(403).json({
          error: "Unauthorized: You are not the owner of this course",
        });
      }
      let NewLessonData = { ...req.body };
      NewLessonData.chapter = chapterId;
      if (req.file) {
        const videoURL = await getFirebaseImgUrl(
          "courses-vid",
          req.file.path,
          req.file.originalname
        );
        console.log("vidUrl" + videoURL);

        NewLessonData.videoUrl = videoURL;
      }

      const newLesson = await Lessons.create(NewLessonData);
      res.status(200).json(NewLessonData);
    } catch (error) {
      next();
    }
  },

  updateLesson: async (req, res, next) => {
    try {
      const lessonId = req.params.lessonId;
      const lesson = await Lessons.findById(lessonId);
      const chapterId = lesson.chapter;
      const userId = req.user.userId;
      const isOwner = await validateCourseOwner({ userId, chapterId });

      if (!isOwner) {
        return res.status(403).json({
          error: "Unauthorized: You are not the owner of this course",
        });
      }

      const updatedLesson = await Lessons.findByIdAndUpdate(
        lessonId,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedLesson);
    } catch (error) {
      next();
    }
  },

  deleteLesson: async (req, res, next) => {
    try {
      const lessonId = req.params.lessonId;
      const lesson = await Lessons.findById(lessonId);
      const chapterId = lesson.chapter;
      const userId = req.user.userId;

      const isOwner = await validateCourseOwner(userId, chapterId);
      console.log(isOwner);
      if (!isOwner) {
        return res.status(403).json({
          error: "Unauthorized: You are not the owner of this course",
        });
      }

      await Lessons.findByIdAndDelete(lessonId);
      res.status(204).end();
    } catch (error) {
      next();
    }
  },
};

module.exports = LessonController;
