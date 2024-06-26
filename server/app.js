const express = require("express"); // Imports the express module
const app = express(); // Creates an Express application.
const connectDB = require("./database");
const path = require("path");
const dotenv = require("dotenv");
let cors = require("cors");

dotenv.config();

app.use(cors());
app.use(express.json());

connectDB();

const port = process.env.PORT || 8000;
const staticPath = path.join(__dirname, "static/images");

const ErrorHandler = require("./middleware/ErrorHandler");
const userRoutes = require("./user/user.routes");
const reviewRoutes = require("./review/review.routes");
const noteRoutes = require("./notes/notes.routes");
const lessonRoutes = require("./lessons/lessons.routes");
const courseRoutes = require("./course/course.routes");
const chapterRoute = require("./chapters/chapters.routes");
const discussionRoutes = require("./discussion/discussion.routes");

app.use("/user", userRoutes);
app.use("/review", reviewRoutes);
app.use("/note", noteRoutes);
app.use("/lesson", lessonRoutes);
app.use("/course", courseRoutes);
app.use("/chapter", chapterRoute);
app.use("/chapter", chapterRoute);
app.use("/discussion", discussionRoutes);
app.use("/images", express.static(staticPath));
app.use(ErrorHandler);

app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
