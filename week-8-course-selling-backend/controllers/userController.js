const bcrypt = require("bcrypt");
const zod = require("zod");
const { courseModel } = require("../model/courseModel");
const { purchaseModel } = require("../model/purchaseModel");
const { userModel } = require("../model/uesrModel");

async function userSignUp(req, res) {
  const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(5),
    firstName: zod.string(),
    lastName: zod.string(),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json({ message: "Invalid Data Format", error: result.error });
  }

  const { email, password, firstName, lastName } = result.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    res.status(200).json({ message: "SignUp Successful" });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ message: "User already exists" });

    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
}

async function userSignin(req, res) {
  const schema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
  });

  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid Data Format",
      error: result.error,
    });
  }

  const { email, password } = result.data;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid Email" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    req.session.userId = user._id;
    res.status(200).json({ message: "Signin Successful" });
  } else {
    res.status(403).json({
      message: "Invalid Password",
    });
  }
}

async function userLogout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res.status(200).json({ message: "Logout Successful" });
  });
}
//  Get User Purchase
async function getUserPurchase(req, res) {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const purchase = await purchaseModel.find({ userId });
  const purchasesCourseId = purchase.map((purchase) => purchase.courseId);
  const coursesData = await courseModel.find({
    _id: {
      $in: purchasesCourseId,
    },
  });

  res.status(200).json({
    purchase,
    coursesData,
  });
}

module.exports = {
  userSignUp,
  userSignin,
  userLogout,
  getUserPurchase,
};
