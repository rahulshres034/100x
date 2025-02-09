// db.js - Convert to CommonJS
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = new Schema({
  email: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Todo = new Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
  },
});

const UserModel = mongoose.model("User", User);
const TodoModel = mongoose.model("Todo", Todo);

module.exports = { UserModel, TodoModel };
