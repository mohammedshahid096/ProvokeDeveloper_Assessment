const express = require("express");
const subscriptionPlanRoutes = express.Router();
const planController = require("../Controllers/subscription.controller");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");

subscriptionPlanRoutes.route("/").get(planController.Plans);
subscriptionPlanRoutes
  .route("/add")
  .post(AuthMiddleware.authentication, planController.AddPlanController);
subscriptionPlanRoutes
  .route("/myplans")
  .get(
    AuthMiddleware.authentication,
    planController.UserSubscriptionController
  );
subscriptionPlanRoutes
  .route("/cancel")
  .put(
    AuthMiddleware.authentication,
    planController.CancelSubscriptionController
  );

module.exports = subscriptionPlanRoutes;
