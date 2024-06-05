// controllers/chapterController.js
const Chapter = require("../models/Chapters"); // Import your Chapter model

const ChapterController = {
  getAllChapters: async (req, res, next) => {
    try {
      const allChapters = await Chapter.find();
      res.status(200).json(allChapters);
    } catch (error) {
      next();
    }
  },

  getChaptersByCourse: async (req, res, next) => {
    try {
      const courseId = req.params.courseId;
      const courseChapters = await Chapter.find({ course: courseId });
      res.status(200).json(courseChapters);
    } catch (error) {
      next();
    }
  },

  createChapter: async (req, res, next) => {
    try {
      const { title, course } = req.body;

      const existingChapter = await Chapter.findOne({
        title,
        course,
      });

      if (existingChapter) {
        // If a chapter with the same title already exists, return a message
        return res
          .status(400)
          .json({ message: "Chapter with this title already exists" });
      }
      const savedChapter = await Chapter.create(req.body);
      res.status(201).json(savedChapter);
    } catch (error) {
      next();
    }
  },

  updateChapter: async (req, res, next) => {
    try {
      const chapterId = req.params.chapterId;
      const updatedChapter = await Chapter.findByIdAndUpdate(
        chapterId,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedChapter);
    } catch (error) {
      next();
    }
  },

  deleteChapter: async (req, res, next) => {
    try {
      const chapterId = req.params.chapterId;
      await Chapter.findByIdAndDelete(chapterId);
      res.status(204).end();
    } catch (error) {
      next();
    }
  },
};

module.exports = ChapterController;
