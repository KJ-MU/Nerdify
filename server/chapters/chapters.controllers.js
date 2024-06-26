// controllers/chapterController.js
const Chapter = require("../models/Chapters");
const Course = require("../models/Course");
const Lessons = require("../models/Lessons");
const getFirebaseImgUrl = require("../services/firebaseStorageService");
const validateCourseOwner = async (ownerId, courseId) => {
  try {
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
      const title = req.body.title;
      const course = req.body.course;
      const userId = req.user.userId;
      const chapter = req.body.chapter;
      const isOwner = await validateCourseOwner(userId, course);

      if (!isOwner) {
        return res.status(403).json({
          error: "Unauthorized: You are not the owner of this course",
        });
      }

      const existingChapter = await Chapter.findOne({
        title: chapter,
        course: course,
      });

      if (existingChapter) {
        // If a chapter with the same title already exists, return a message
        // const savedChapter = existingChapter;
        const NewLessonData = {};
        NewLessonData.title = title;
        NewLessonData.chapter = existingChapter._id;

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
        res.status(201).json(existingChapter);
      }
      if (!existingChapter) {
        const newChapterData = {};
        newChapterData.title = chapter;
        newChapterData.course = course;
        const savedChapter = await Chapter.create(newChapterData);
        const NewLessonData = {};
        NewLessonData.title = title;
        NewLessonData.chapter = savedChapter._id;
        if (req.file) {
          const videoURL = await getFirebaseImgUrl(
            "courses-vid",
            req.file.path,
            req.file.originalname
          );

          NewLessonData.videoUrl = videoURL;
        }

        const newLesson = await Lessons.create(NewLessonData);
        res.status(201).json(savedChapter);
      }
    } catch (error) {
      next();
    }
  },

  updateChapter: async (req, res, next) => {
    try {
      const chapterId = req.params.chapterId;
      const userId = req.user.userId;
      const chapter = await Chapter.findById(chapterId);
      const courseId = chapter.course;
      const isOwner = await validateCourseOwner({ userId, courseId });

      if (!isOwner) {
        return res.status(403).json({
          error: "Unauthorized: You are not the owner of this course",
        });
      }
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
      const userId = req.user.userId;
      const chapter = await Chapter.findById(chapterId);
      const courseId = chapter.course;
      const isOwner = await validateCourseOwner(userId, courseId);

      if (!isOwner) {
        return res.status(403).json({
          error: "Unauthorized: You are not the owner of this course",
        });
      }

      await Chapter.findByIdAndDelete(chapterId);
      res.status(204).end();
    } catch (error) {
      next();
    }
  },
};

module.exports = ChapterController;
