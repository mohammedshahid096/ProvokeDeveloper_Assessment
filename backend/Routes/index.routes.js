const express = require("express");
const IndexRoutes = express.Router();
const userRoutes = require("./user.routes");
const plansRoutes = require("./subcription.route");

IndexRoutes.use("/user", userRoutes);
IndexRoutes.use("/plans", plansRoutes);

module.exports = IndexRoutes;
