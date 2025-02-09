// Import required modules
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Array to store user details: username, password, and token
const users = [];

// Secret key used for signing JWTs
const JWT_SECRET = "This is a secret key";

// Logger middleware to log HTTP request methods and paths
const logger = (req, res, next) => {
  console.log(`${req.method} request received at ${req.path}`);
  next();
};

// Middleware to serve static files from the 'public' directory
app.use(express.static("public"));

// Serve the 'index.html' file from the 'public' directory
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Endpoint for user sign-up
app.post("/sign-up", logger, (req, res) => {
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  // Check if the username already exists
  if (users.find((user) => user.username === username)) {
    return res.status(400).send("Username already exists");
  }

  // Add the new user to the 'users' array
  users.push({
    username,
    password,
    token: null,
  });

  res.status(201).send("User registered successfully");
});

// Endpoint for user sign-in
app.post("/sign-in", (req, res) => {
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  // Find the user in the 'users' array
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(401).send("Invalid username or password");
  }

  // Generate a JWT for the user
  const token = jwt.sign({ username }, JWT_SECRET);
  user.token = token; // Save the token for the user

  res.status(200).json({
    token,
    message: "Sign-in successful",
  });
});

// Authentication middleware to validate JWT
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the token is provided in the request header
  if (!authHeader) {
    return res.status(401).send("Token required");
  }

  try {
    // Extract token, removing "Bearer " prefix
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.username = decodedToken.username;
    next();
  } catch (err) {
    return res.status(400).send("Invalid token");
  }
};

// Endpoint for user log-out
app.post("/log-out", (req, res) => {
  const authHeader = req.headers.authorization;

  // Check if the token is provided
  if (!authHeader) {
    return res.status(401).send("Token required");
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(authHeader, JWT_SECRET);

    // Find the user and invalidate the token
    const user = users.find((user) => user.username === decodedToken.username);
    if (user) {
      user.token = null;
      res.status(200).send("Log-out successful");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    return res.status(400).send("Invalid token");
  }
});

// Endpoint to retrieve user information
app.get("/me", logger, auth, (req, res) => {
  const username = req.username;

  // Find the authenticated user in the 'users' array
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(404).send("User not found");
  }

  // Send user details as response
  res.status(200).json({
    username: user.username,
    password: user.password, // In a real app, avoid sending passwords!
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
