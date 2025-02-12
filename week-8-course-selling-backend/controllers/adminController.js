const bcrypt = require("bcrypt");
const zod = require("zod");

// Admin SignUp
async function adminSignup(req, res) {
  const schema = zod.object({
    email: zod.string().email().min(5),
    passqord: zod.string().min(5),
    firstName: zod.string(),
    lastName: zod.string(),
  });

  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Incorrect Data Format",
      error: result.error,
    });
  }

  const { email, password, firstName, lastName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await adminModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    res.status(200).json({
      message: "SignUp Successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Admin Already exixts",
    });
  }
}
