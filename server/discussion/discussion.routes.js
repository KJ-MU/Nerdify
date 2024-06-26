const express = require("express");
const router = express.Router();
const {
  createDiscussion,
  addComment,
  getDiscussionsByCourse,
} = require("./discussion.controllers");
const auth = require("../middleware/Auth");
const fileUpload = require("../middleware/FileUpload");
// Route to create a new discussion
router.post("/", auth, fileUpload.single("image"), createDiscussion);

// Route to add a comment to a discussion
router.post("/:discussionId/comment", auth, addComment);

// Route to get discussions by course ID
router.get("/course/:courseId", getDiscussionsByCourse);

module.exports = router;
