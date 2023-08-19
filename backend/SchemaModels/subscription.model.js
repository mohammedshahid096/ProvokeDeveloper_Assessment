const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
    device: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    videoQuality: {
      type: String,
      required: true,
    },
    resolution: {
      type: String,
      required: true,
    },
    useDevices: {
      type: Array,
      required: true,
    },
    Payment: {
      type: Number,
      required: true,
    },
    BillingCycle: {
      type: String,
      required: true,
    },
    subscriptionCanceled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const subscriptionModel = mongoose.model(
  "userssubscriptions",
  subscriptionSchema
);
module.exports = subscriptionModel;
