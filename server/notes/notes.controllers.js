// controllers/notesController.js
const Notes = require("../models/Notes"); // Import your Notes model

const NotesController = {
  getAllNotes: async (req, res, next) => {
    try {
      const allNotes = await Notes.find();
      res.status(200).json(allNotes);
    } catch (error) {
      next();
    }
  },

  getNotesByUser: async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const userNotes = await Notes.find({ user: userId });
      res.status(200).json(userNotes);
    } catch (error) {
      next();
    }
  },

  createNote: async (req, res, next) => {
    try {
      const { text, lesson, user } = req.body;
      const newNote = new Notes({ text, lesson, user });
      const savedNote = await newNote.save();
      res.status(201).json(savedNote);
    } catch (error) {
      next();
    }
  },

  updateNote: async (req, res, next) => {
    try {
      const noteId = req.params.noteId;
      const updatedNote = await Notes.findByIdAndUpdate(noteId, req.body, {
        new: true,
      });
      res.status(200).json(updatedNote);
    } catch (error) {
      next();
    }
  },

  deleteNote: async (req, res, next) => {
    try {
      const noteId = req.params.noteId;
      await Notes.findByIdAndDelete(noteId);
      res.status(204).end();
    } catch (error) {
      next();
    }
  },
};

module.exports = NotesController;
