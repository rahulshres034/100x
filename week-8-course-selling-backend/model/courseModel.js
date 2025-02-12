// Import mongoose to interact with mongodb. 💾
const mongoose = require("mongoose");
// Define Schema for creating new Models. 📝
const Schema = mongoose.Schema;
// Use Object id type of mongodb reference. 🔗
const ObjectId = mongoose.ObjectId;

// Define the course schema. 📚
const courseSchema = new Schema({
  // Title of the course (String). 🏷️
  title: String,
  // Description of the course (String). 📃
  description: String,
  // Price of the course (Number). 💰
  price: Number,
  // URL of the course image (String). 🖼️
  imageUrl: String,
  // ID of the creator of the course (ObjectId, referencing another document). 🧑‍🏫
  creatorId: ObjectId,
});

// Create and export course model. ⚙️
const courseModel = mongoose.model("course", courseSchema);
// Export the courseModel for use in other parts of the application. 🚀
module.exports = {
  courseModel,
};
