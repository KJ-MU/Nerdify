const Notes = require("../models/Notes");

const NotesController = {
  // Create a new note
  createNote: async (req, res, next) => {
    try {
      const { text, lesson } = req.body;
      const userId = req.user.userId;
      console.log(lesson);
      const newNote = await Notes.create({
        text,
        lesson,
        user: userId,
      });

      res.status(201).json(newNote);
    } catch (error) {
      next(error);
    }
  },

  // Get notes by user and lesson
  getNotesByUserAndLesson: async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const lessonId = req.params.lessonId;

      const notes = await Notes.find({ user: userId, lesson: lessonId });
      res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = NotesController;
