// config/sessionConfig.js
// Import required dependencies
const MongoStore = require("connect-mongo"); // For storing sessions in MongoDB
require("dotenv").config(); // Load environment variables

// Get environment variables
const MONGODB_URL = process.env.MONGODB_URL; // MongoDB connection URL
const SESSION_ADMIN_SECRET = process.env.SESSION_ADMIN_SECRET; // Secret for admin sessions
const SESSION_USER_SECRET = process.env.SESSION_USER_SECRET; // Secret for user sessions

// Admin session configuration
const adminSessionConfig = {
  secret: SESSION_ADMIN_SECRET, // Secret key for session
  resave: false, // Don't save session if unmodified
  saveUninitialized: false, // Don't create session until something stored
  store: MongoStore.create({ mongoUrl: MONGODB_URL }), // Store sessions in MongoDB
  cookie: {
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    maxAge: 1000 * 60 * 60 * 24, // Cookie expiry: 1 day
  },
};

// User session configuration
const userSessionConfig = {
  secret: SESSION_USER_SECRET, // Secret key for session
  resave: false, // Don't save session if unmodified
  saveUninitialized: false, // Don't create session until something stored
  store: MongoStore.create({ mongoUrl: MONGODB_URL }), // Store sessions in MongoDB
  cookie: {
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    maxAge: 1000 * 60 * 60 * 24, // Cookie expiry: 1 day
  },
};

// Export configurations
module.exports = {
  adminSessionConfig,
  userSessionConfig,
};
