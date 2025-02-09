// index.js
// Required module imports
const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

// Import user and todos models from db.js
const { UserModel, TodoModel } = require("./db");

// Import auth middleware
const { auth, JWT_SECRET } = require("./auth");

// Create an instance of the express module
const app = express();

// Use express.json middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
// Updated MongoDB connection with proper options
mongoose
  .connect(
    "mongodb+srv://admin:pass@week7.oin0p.mongodb.net/?retryWrites=true&w=majority&appName=week7",
    {
      tls: true,
      tlsInsecure: false, // For development only. Remove in production
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Sign-up API for creating a new user
app.post("/register", async (req, res) => {
  // Validate request body using Zod schema
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(6),
    name: z.string().min(1),
  });

  const parsedData = schema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  const { email, password, name } = req.body;

  console.log(email, password, name);
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({ email, password: hashedPassword, name });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(409).json({ message: "User already exists" });
  }
});

// Login API for user authentication
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ token, message: "Login successful" });
});

// Create a new todo
app.post("/todo", auth, async (req, res) => {
  const { title, isDone, deadline } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  await TodoModel.create({
    title,
    userId: req.userId,
    isDone: isDone || false,
    deadline: deadline || null,
  });

  res.status(201).json({ message: "Todo created successfully" });
});

// Get all todos for the authenticated user
app.get("/todos", auth, async (req, res) => {
  const todos = await TodoModel.find({ userId: req.userId });
  res.status(200).json(todos);
});

// Update a todo
app.put("/todo/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { title, isDone } = req.body;
  const todo = await TodoModel.findOne({ _id: id, userId: req.userId });

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todo.title = title || todo.title;
  todo.isDone = isDone !== undefined ? isDone : todo.isDone;
  await todo.save();

  res.status(200).json({ message: "Todo updated successfully" });
});

// Delete a todo
app.delete("/todo/:id", auth, async (req, res) => {
  const { id } = req.params;
  const todo = await TodoModel.findOneAndDelete({
    _id: id,
    userId: req.userId,
  });

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.status(200).json({ message: "Todo deleted successfully" });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
