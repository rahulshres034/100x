// Import mongoose to interact with mongoDb. 💾
const mongoose = require("mongoose");

// Define Schema to create models. 📝
const Schema = mongoose.Schema;

// Define the user schema. 🧑‍💼
const userSchema = new Schema({
  // Email field, must be a unique string. 📧
  email: {
    type: String,
    unique: true,
  },
  // Password field, a string for storing the password. 🔑
  password: String,
  // First name field, a string for the user's first name. 🏷️
  firstName: String,
  // Last name field, a string for the user's last name. 🔖
  lastName: String,
});

// Create usermodel. ⚙️  <- Fixed typo here: should be userSchema, not userModel
const userModel = mongoose.model("user", userSchema);

// Export the userModel. 🚀
module.exports = {
  userModel,
};
