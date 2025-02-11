// import mongoose to interact with MongoDB 🥭
import mongoose from "mongoose";

// Using Schema and Object Id from mongoose for creating models 🛠️
const Schema = mongoose.Schema; // Define schema for creating models 📝
const ObjectId = mongoose.ObjectId; // Using ObjectID type for MongoDB document refrences 🔗

// Define the User Schema with email, password, firstName, and lastName fields 🧑‍💼
const userSchema = new Schema({
  email: {
    type: String,
    unique: true, // Email should be unique 📿
  },
  password: String, // User's password 🔑
  firstName: String, // User's first name 🏷️
  lastName: String, // User's last name 🔖
});

// Define Admin Schema with email,password,firstName, lastName fields 👮
const adminSchema = new Schema({
  email: {
    type: String,
    unique: true, // Admin email should be unique 📿
  },
  password: String, // Admin's password 🔑
  firstName: String, // Admin's first name 🏷️
  lastName: String, // Admin's last name 🔖
});

// Define course schema with title, description, price, imageUrl, and creatorId field 📚
const courseSchema = new Schema({
  title: String, // Title of the course 📝
  description: String, // Description of the course 📖
  price: Number, // Price of the course 💰
  imageUrl: String, // URL of the course image 🖼️
  creatorId: ObjectId, // ID of the user who created the course 🧑‍🏫
});

// Define purchase schema with userID and courseID field 🛒
const purchaseSchema = new Schema({
  userId: ObjectId, // refrence to the userId who made the purchase 🧑‍💼
  courseId: ObjectId, // refrence to the purchased course's object id 📚
});

// Creatign models for User,Admin,Course, and Purchase using respective schemas 🚀
const userModel = mongoose.model("user", userSchema); // Usero model 🧑‍💼
const adminModel = mongoose.model("admin", adminSchema); // Admin mdel 👮
const courseModel = mongoose.model("course", courseSchema); // Course model 📚
const purchaseModel = mongoose.model("purchase", purchaseSchema); // Purchase model 🛒

module.exports = {
  userModel, // Export user model 📤
  adminModel, // Export admin model 📤
  courseModel, // Export course model 📤
  purchaseModel, // Export purchase model 📤
};
