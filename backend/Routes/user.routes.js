const express = require("express");
const userRoutes = express.Router();
const userController = require("../Controllers/user.controller");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");

userRoutes.route("/login").post(userController.loginController);
userRoutes.route("/register").post(userController.signupController);
userRoutes.route("/logout").get(userController.logoutController);
userRoutes
  .route("/me")
  .get(AuthMiddleware.authentication, userController.getUserMe);

module.exports = userRoutes;
