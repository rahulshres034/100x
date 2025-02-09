/*
Assignment #6 - You have to create a middleware for rate limiting a users request based on their username passed in the header

You have been given an express server which has a few endpoints.

    Your task is to create a global middleware (app.use) which will rate limit the requests from a user to only 5 request per second
    - If a user sends more than 5 requests in a single second, the server should block them with a 404.
    - User will be sending in their user id in the header as 'user-id'
    - You have been given a numberOfRequestsForUser object to start off with which clears every one second
*/

// Import the express module
const express = require("express");
// Create an express application
const app = express();

// Create a global object to track the number of requests per user
let numberOfRequestForUser = {};

// Reset the number of requests every second
setInterval(() => {
  numberOfRequestForUser = {}; // Clear the object every 1 second
}, 1000);

// Middleware to limit the number of requests per user
app.use((req, res, next) => {
  const userId = req.headers["user-id"]; // Get user ID from request headers

  // Initialize request count for the user if not already present
  if (!numberOfRequestForUser[userId]) {
    numberOfRequestForUser[userId] = 1;
  } else {
    numberOfRequestForUser[userId]++; // Increment the request count
  }

  // If request count exceeds 5, block the user
  if (numberOfRequestForUser[userId] > 5) {
    res.status(429).send("Too many requests. Please try again later."); // HTTP 429 for rate limiting
  } else {
    next(); // Proceed to the next middleware or route handler
  }
});

// Example GET route
app.get("/user", (req, res) => {
  res.status(200).json({ name: "Rahul" });
});

// Example POST route
app.post("/user", (req, res) => {
  res.status(201).json({ msg: "Created dummy user" });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

// Example using curl:

// Open a terminal and run the following commands to simulate rapid requests:
// bash
// Copy
// Edit
// curl -H "user-id: user1" http://localhost:3000/user
// curl -H "user-id: user1" http://localhost:3000/user
// curl -H "user-id: user1" http://localhost:3000/user
// curl -H "user-id: user1" http://localhost:3000/user
// curl -H "user-id: user1" http://localhost:3000/user
// curl -H "user-id: user1" http://localhost:3000/user
