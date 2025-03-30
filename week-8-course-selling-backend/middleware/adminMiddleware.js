// middleware/adminMiddleware.js
// Middleware to verify admin authentication
function adminMiddleware(req, res, next) {
  // Check if admin session exists
  if (req.session && req.session.adminId) {
    // Attach admin ID to request object
    req.adminId = req.session.adminId;
    return next();
  }
  // Return unauthorized if no valid session
  return res.status(401).json({ message: "Unauthorized" });
}

module.exports = adminMiddleware;

// middleware/adminSessionMiddleware.js
const session = require("express-session");
const { adminSessionConfig } = require("../config/sessionConfig");

// Create session middleware with admin configuration
const adminSessionMiddleware = session(adminSessionConfig);

module.exports = adminSessionMiddleware;
