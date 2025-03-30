const { Router } = require("express");
const { userMiddleware } = require("../middleware/userMiddleware");
const courseController = require("../controllers/courseController");
const {
  userSessionMiddleware,
} = require("../middleware/userSessionMiddleware");

const courseRouter = Router();
courseRouter.post(
  "/purchase",
  userSessionMiddleware,
  userMiddleware,
  courseController.purchaseCourse
);
courseRouter.get("/preview", courseController.previewCourses);

module.exports = courseRouter;
