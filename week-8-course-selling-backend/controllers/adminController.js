// controllers/adminController.js
const bcrypt = require("bcrypt"); // For password hashing
const zod = require("zod"); // For input validation
const { adminModel } = require("../models/adminModel"); // Import admin model
const { courseModel } = require("../models/courseModel"); // Import course model

// Admin controller object containing all admin-related functions
const adminController = {
  // Handle admin signup
  async adminSignup(req, res) {
    // Define validation schema
    const schema = zod.object({
      email: zod.string().email(), // Validate email format
      password: zod.string().min(6), // Minimum 6 characters for password (increased from 5 for better security)
      firstName: zod.string().min(1), // Ensure first name is not empty
      lastName: zod.string().min(1), // Ensure last name is not empty
    });

    try {
      // Validate request body
      const result = schema.parse(req.body); // Use parse instead of safeParse to throw an error if validation fails

      // Extract data from validated result
      const { email, password, firstName, lastName } = result;

      // Hash password before storing
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new admin in database
      await adminModel.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      res.status(201).json({ message: "SignUp Successful" }); // Use 201 for resource creation
    } catch (error) {
      if (error instanceof zod.ZodError) {
        // Handle validation errors
        return res.status(400).json({
          message: "Incorrect Data Format",
          error: error.errors,
        });
      } else if (error.code === 11000) {
        // Handle duplicate key error (assuming email is unique)
        return res.status(409).json({ message: "Admin Already exists" }); // Use 409 for conflict
      } else {
        // Handle other errors
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  },

  // Handle admin signin
  async adminSignin(req, res) {
    // Define validation schema
    const schema = zod.object({
      email: zod.string().email(),
      password: zod.string().min(6),
    });

    try {
      // Validate request body
      const { email, password } = schema.parse(req.body);

      // Find admin by email
      const admin = await adminModel.findOne({ email });

      if (!admin) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      // Compare provided password with stored hash
      const passwordMatch = await bcrypt.compare(password, admin.password);

      if (passwordMatch) {
        // Set admin session
        req.session.adminId = admin._id;
        res.status(200).json({ message: "Signin successful" });
      } else {
        res.status(401).json({ message: "Invalid credentials" }); // Use 401 for authentication failure
      }
    } catch (error) {
      if (error instanceof zod.ZodError) {
        return res.status(400).json({
          message: "Incorrect Data Format",
          error: error.errors,
        });
      } else {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  },

  // Handle course creation
  async createCourse(req, res) {
    // Validate course data
    const schema = zod.object({
      title: zod.string().min(3),
      description: zod.string().min(10), // Ensure description is not too short
      imageUrl: zod.string().url(),
      price: zod.number().positive(),
    });

    try {
      // Validate and extract data
      const { title, description, imageUrl, price } = schema.parse(req.body);

      // Ensure adminId is available in the request
      if (!req.adminId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Create new course
      const course = await courseModel.create({
        title,
        description,
        imageUrl,
        price,
        creatorId: req.adminId,
      });

      res.status(201).json({
        message: "Course Created",
        courseId: course._id,
      });
    } catch (error) {
      if (error instanceof zod.ZodError) {
        return res.status(400).json({
          message: "Incorrect Data Format",
          error: error.errors,
        });
      } else {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  },

  // Update Course
  async updateCourse(req, res) {
    const schema = zod.object({
      courseId: zod.string(),
      title: zod.string().optional(),
      description: zod.string().optional(),
      imageUrl: zod.string().optional().url(),
      price: zod.number().optional().positive(),
    });

    const result = schema.safeParse(req.body);

    if (!result) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const { courseId, title, description, imageUrl, price } = req.body;
    const course = await courseModel.findOne({
      _id: courseId,
      creatorId: req.adminId,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await courseModel.updateOne(
      { _id: courseId },
      {
        title: title || course.title,
        description: description || course.description,
        imageUrl: imageUrl || course.imageUrl,
        price: price || course.price,
      }
    );

    res.status(200).json({ message: "Course updated successfully" });
  },

  async deleteCourse(req, res) {
    const schema = zod.object({
      courseId: zod.string().min(5),
    });

    const result = schema.safeParse(req.params);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid input data" });
    }
    const { courseId } = result.data;
    const course = await courseModel.findOne({
      _id: courseId,
      creatorId: req.adminId,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await courseModel.deleteOne({ _id: courseId, creatorId: req.adminId });
    res.status(200).json({ message: "Course deleted successfully" });
  },

  async getAllCourses(req, res) {
    const courses = await courseModel.find({});
    res.status(200).json({ courses });
  },
};

module.exports = {
  adminSignup,
  adminSignin,
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
};
