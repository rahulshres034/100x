// Import the express-session library. 📦
const session = require("express-session");
// Import the user session configuration. ⚙️
const { userSessionConfig } = require("../config/sessionConfig");
// Create the user session middleware using the imported configuration. 🔐
const userSessionMiddleware = session(userSessionConfig);

// Export the user session middleware. 🚀  <- Fixed typo here: module.exports
module.exports = userSessionMiddleware;
