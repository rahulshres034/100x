const mongoose = require("mongoose");

//  Use Schema and object id from mongoose  for creating tables
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Define the user schema with feilds for email and password
const User = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: String,
});

// Define the TODO schema with feilds for title, done and userID
const Todo = new Schema({
  title: String,
  done: Boolean,
  userId: ObjectId,
});

// create mongoose models for user and todo collections using the User and Todo schemas
const UserModel = mongoose.model("user", User);
const TodoModel = mongoose.model("todo", Todo);

// Export the UserModel and TodoModel
module.exports = {
  UserModel,
  TodoModel,
};
