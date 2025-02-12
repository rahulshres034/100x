// model/adminModel.js

// Import the mongoose library for MongoDB interaction. 📦
const mongoose = require("mongoose");

// Define the Schema constructor for creating new schemas. 📝
const Schema = mongoose.Schema;

// Create a new schema for the Admin model. 🧑‍💼
const adminSchema = new Schema({
  // Email field, must be a unique string. 📧
  email: {
    type: String,
    unique: true,
  },
  // Password field, a string for storing the password. 🔑
  password: String,
  // First name field, a string for the admin's first name. 🏷️
  firstName: String,
  // Last name field, a string for the admin's last name. 🔖
  lastName: String,
});

// Create the Admin model using the defined schema. ⚙️
const adminModel = mongoose.model("Admin", adminSchema);

// Export the adminModel for use in other parts of the application. 🚀
module.exports = {
  adminModel,
};
