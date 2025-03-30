// Import required dependencies
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Import route handlers
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const courseRouter = require("./routes/course");

// Import session middleware
const adminSessionMiddleware = require("./middleware/adminSessionMiddleware");
const userSessionMiddleware = require("./middleware/userSessionMiddleware");

// Create Express application
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware Setup
app.use(express.json()); // Parse JSON bodies

// Session Middleware Setup
app.use("/admin", adminSessionMiddleware); // Apply admin session middleware to admin routes
app.use("/user", userSessionMiddleware); // Apply user session middleware to user routes

// Route Setup
app.use("/api/v1/admin", adminSessionMiddleware, adminRouter); // Admin routes
app.use("/api/v1/user", userSessionMiddleware, userRouter); // User routes
app.use("/course", courseRouter); // Course routes

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
