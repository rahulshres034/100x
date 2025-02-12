// Import mongoose to interact with mongodb. 💾
const mongoose = require("mongoose");

// Define the mongoose schema to create models. 📝
const Schema = mongoose.Schema;
// Use objectid to create relationship in mongodb. 🔗
const ObjectId = mongoose.ObjectId;

// Define the Purchase Schema. 🛒
const purchaseSchema = new Schema({
  // Reference to the user's ObjectId who made the purchase. 🧑‍💼
  userId: ObjectId,
  // Reference to the purchased course's object id. 📚
  courseId: ObjectId,
});

// Create model of purchase schema. ⚙️
const purchaseModel = mongoose.model("purchase", purchaseSchema);

// Export the purchaseModel. 🚀
module.exports = {
  purchaseModel,
};
