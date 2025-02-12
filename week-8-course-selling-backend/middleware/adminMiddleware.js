// Middleware to check if user is authenticated or not. 🛡️
function adminMiddlware(req, res, next) {
  // Check if session exists and contains adminId. 🤔
  if (req.session && req.session.adminId) {
    // Attach admin id to req object. 📌
    req.adminId = req.session.adminId;
    // Proceed to next middleware or route handler. ➡️
    return next();
  }
  // If not authenticated, return 401 Unauthorized. 🚫
  return res.status(401).json({
    message: "You are not authorized", // Error message. ❌
  });
}

// Export the adminMiddlware. 🚀
module.exports = {
  adminMiddlware,
};
