// Import the jsonwebtoken library for JWT operations.
const jwt = require("jsonwebtoken");

// This should ideally be retrieved from environment variables for security.
// DO NOT hardcode secrets in your code.
const JWT_SECRET = process.env.JWT_SECRET || "secret"; // Fallback only for development

// Authentication middleware function.
function auth(req, res, next) {
    // Extract the token from the Authorization header.  Commonly formatted as "Bearer <token>"
    const token = req.headers.authorization;

    // Check if a token was provided.
    if (!token) {
        return res.status(401).json({ message: "No token provided" }); // Explicitly return to stop further execution
    }

    try {
        // Verify and decode the token.  This will throw an error if the token is invalid.
        const decoded = jwt.verify(token, JWT_SECRET);

        // Check if the decoded token contains the expected user information (e.g., user ID).
        if (!decoded || !decoded.id) { // Check for both decoded and the presence of an ID
            return res.status(401).json({ message: "Invalid token provided" }); // More specific message
        }

        // Attach the user ID from the decoded token to the request object.
        // This makes the user's ID available to subsequent middleware and route handlers.
        req.userId = decoded.id;

        // Call the next middleware in the chain. This is crucial for the request to continue processing.
        next();

    } catch (err) {
        // Handle token verification errors (e.g., expired, invalid signature).
        console.error("Token verification error:", err); // Log the error for debugging
        return res.status(401).json({ message: "Invalid token provided" }); // Generic error message for security
    }
}

// Export the authentication middleware for use in other modules.
module.exports = {
    auth,
    JWT_SECRET
};