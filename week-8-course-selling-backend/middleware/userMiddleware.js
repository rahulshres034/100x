// Middleware to check if user is authenticated or not. 🛡️
function userMiddleware(req, res, next) {
  // Log session to debug (useful for development). 🐞
  console.log("Session: ", req.session);

  // Check if session exists and contains userId. 🤔
  if (req.session && req.session.userId) {
    // Attach the userId to the req object. 📌
    req.userId = req.session.userId;
    // Proceed to the next middleware or route handler. ➡️
    return next();
  }

  // If not authenticated, return 401 Unauthorized. 🚫
  return res.status(401).json({
    message: "Unauthorized", // Error message. ❌
  });
}

// Export the userMiddleware. 🚀
module.exports = userMiddleware;
