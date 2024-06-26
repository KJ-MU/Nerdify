const Discussion = require("../models/Discussion");

const DiscussionController = {
  // Create a new discussion
  createDiscussion: async (req, res, next) => {
    try {
      console.log(req.body);
      const { title, text, course } = req.body;
      const userId = req.user.userId;

      const newDiscussion = await Discussion.create({
        title,
        text,
        course,
        user: userId,
      });
      const upadateDiscussion = await Discussion.findById(
        newDiscussion._id
      ).populate("user");

      res.status(201).json(upadateDiscussion);
    } catch (error) {
      next(error);
    }
  },

  // Add a comment to a discussion
  addComment: async (req, res, next) => {
    try {
      const discussionId = req.params.discussionId;
      const { text } = req.body;
      const userId = req.user.userId;

      const discussion = await Discussion.findById(discussionId);
      if (!discussion) {
        return res.status(404).json({ error: "Discussion not found" });
      }

      discussion.comments.push({ text, user: userId });
      const updatedDiscussion = await discussion.save();
      const populatedDiscussion = await Discussion.findById(
        updatedDiscussion._id
      )
        .populate("user")
        .populate("comments.user");
      res.status(200).json(populatedDiscussion);
    } catch (error) {
      next(error);
    }
  },

  // Get discussions by course ID
  getDiscussionsByCourse: async (req, res, next) => {
    try {
      const courseId = req.params.courseId;

      const discussions = await Discussion.find({ course: courseId })
        .populate("user")
        .populate("comments.user");
      res.status(200).json(discussions);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = DiscussionController;
