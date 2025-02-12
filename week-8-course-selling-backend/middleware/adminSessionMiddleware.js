// Import the express-session library. 📦
const session = require("express-session");
// Import the admin session configuration. ⚙️
const { adminSessionConfig } = require("../config/sessionConfig");

// Create the admin session middleware using the imported configuration. 🔐
const adminSessionMiddleware = session(adminSessionConfig);

// Export the admin session middleware. 🚀
module.exports = adminSessionMiddleware;
