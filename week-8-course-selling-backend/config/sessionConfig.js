// Import the dotenv module to load environment variable form .env file ⚙️
require("dotenv").config();

// Import the connect-mongo package for session storage in MongoDB 💾
const MongoStore = require("connect-mongo");
const { Cookie } = require("express-session");

// Retrive MongoDB URI and session secrets  from environment variables 🔑
const MONGODB_URL = process.env.MONGODB_URL; // MongoDB connection URL 🔗
const SESSION_ADMIN_SECRET = process.env.SESSION_ADMIN_SECRET; // Secret for admin sessions 🤫
const SESSION_USER_SECRET = process.env.SESSION_USER_SECRET; // Secret for user sessions 🤫

// Configuration for admin sessions 👮
adminSessionConfig = {
  secret: SESSION_ADMIN_SECRET, // Secret key for signing the session ID cookie 🔑
  resave: false, // Don't save session if unmodified 🔄
  saveUninitialized: false, // Don't create session until something stored 🆕
  store: MongoStore.create({ mongoUrl: MONGODB_URL }), // Store sessions in MongoDB 💾
};

// Configuration for user sessions 🧑‍💼
userSessionConfig = {
  secret: SESSION_USER_SECRET, // Secret key for signing the session ID cookie 🔑
  resave: false, // Don't save session if unmodified 🔄
  saveUninitialized: false, // Don't create session until something stored 🆕
  store: MongoStore.create({ mongoUrl: MONGODB_URL }), // Store sessions in MongoDB 💾
};

// Export the session configurations 📤
module.exports = {
  adminSessionConfig, // Export admin session config 👮
  userSessionConfig, // Export user session config 🧑‍💼
};
