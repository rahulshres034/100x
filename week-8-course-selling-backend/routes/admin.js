const { Router } = require("express");
const userMiddleware = require("../middleware/userMiddleware");
const userController = require("../controllers/userController");

const userRouter = Router();

userRouter.post("/signup", userController.userSignUp);
userRouter.post("/signin", userController.userSignin);
userRouter.post("/signout", userController.userLogout);
userRouter.get("/purchases", userMiddleware, userController.getUserPurchase);

module.exports = userRouter;
