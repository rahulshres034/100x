// controllers/courseController.js
const { purchaseModel } = require("../models/purchaseModel");
const { courseModel } = require("../models/courseModel");

// Course controller object containing all course-related functions
const courseController = {
  // Handle course purchase
  async purchaseCourse(req, res) {
    const userId = req.session.userId;
    const courseId = req.body.courseId;

    if (!courseId) {
      return res.status(400).json({ message: "Please provide courseId" });
    }

    try {
      // Check if user already purchased the course
      const existingPurchase = await purchaseModel.findOne({
        courseId,
        userId,
      });

      if (existingPurchase) {
        return res.status(400).json({
          message: "You have already purchased this course",
        });
      }

      // Create new purchase record
      await purchaseModel.create({
        courseId,
        userId,
      });

      return res.status(200).json({ message: "Course purchased successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to purchase the course" });
    }
  },

  // Get all courses for preview
  async previewCourses(req, res) {
    try {
      const courses = await courseModel.find({});
      return res.status(200).json(courses);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to preview courses" });
    }
  },
};

module.exports = {
  purchaseCourse,
  previewCourses,
};
