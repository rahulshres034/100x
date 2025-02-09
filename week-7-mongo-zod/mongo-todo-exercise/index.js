const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
// Import user and todo model from db.js
const { UserModel, TodoModel } = require("./db");
const { default: mongoose } = require("mongoose");
// Parse the JSON data from the request body
app.use(express.json());

// Connect the MongoDB database using mongoose.connect method
mongoose.connect(
  "mongodb+srv://admin:pass@week7.oin0p.mongodb.net/?retryWrites=true&w=majority&appName=week7"
);

// createa JWT secret key
const JWT_SECRET = "secret";

// create a sign up endpoint
app.post("/signup", async (req, res) => {
  // get the email, password and name from the request body
  const { email, password, name } = req.body;
  try {
    // create a new user using the User.create() method
    await UserModel.create({ email, password, name });
    res.status(201).send("User created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
// create a POST route for sign in
app.post("/signin", async (req, res) => {
  // get the email and password from the request body
  const { email, password } = req.body;

  try {
    // find the user with the email and password
    const user = UserModel.findOne({ email, password });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    // create a JWT token with the user id and secret key
    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    // send the token as response
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// create a auth middleware to authenticate the user
const auth = async (req, res, next) => {
  // get the token from req.headers
  const token = req.headers.authorization;

  try {
    // verify the token using jwt.verify() method
    const decodedData = jwt.verify(token, JWT_SECRET);

    // if the token is valid
    if (!decodedData) {
      return res.status(401).send("Invalid token");
    }
    console.log(decodedData);
    req.id = decodedData.id;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// create a POST route for creating a todo
app.post("/todo", auth, async (req, res) => {
  // get the title, done, and userId from the request body
  const { title, done } = req.body;

  // get userId from req.id
  const userId = req.id;

  try {
    // create new todo using create() method
    await TodoModel.create({ title, done, userId });
    // send the response
    res.status(201).send("Todo created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// create a GET route for getting all todos
app.get("/todo", auth, async (req, res) => {
  // get user id from req.id
  const userId = req.id;

  try {
    // find all todos with the userId
    const todos = await TodoModel.find({ userId });
    // send the response
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
