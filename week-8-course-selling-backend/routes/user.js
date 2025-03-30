const { Router } = require("express");
const { userMiddleware } = require("../middleware/userMiddleware");
const userController = require("../controllers/userController");

const userRoute = Router();

userRoute.post("/signup", userController.userSignUp);
userRoute.post("/signin", userController.userSignin);
userRoute.post("/signout", userController.userLogout);
userRoute.get("/purchases", userMiddleware, userController.getUserPurchase);

module.exports = userRoute;
