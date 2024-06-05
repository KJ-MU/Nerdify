// controllers/lessonController.js
const Lessons = require("../models/Lessons"); // Import your Lesson model
const getFirebaseImgUrl = require("../services/firebaseStorageService");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const { log } = require("console");

const LessonController = {
  getAllLessons: async (req, res, next) => {
    try {
      const allLessons = await Lessons.find();
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
      let NewLessonData = { ...req.body };

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
      await Lessons.findByIdAndDelete(lessonId);
      res.status(204).end();
    } catch (error) {
      next();
    }
  },
};

module.exports = LessonController;
