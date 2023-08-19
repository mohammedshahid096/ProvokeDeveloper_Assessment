const createError = require("http-errors");
const subscriptionModel = require("../SchemaModels/subscription.model");
const userModel = require("../SchemaModels/user.model");

module.exports.Plans = (req, res, next) => {
  try {
    const plansData = {
      monthly: [
        {
          device: "Mobile",
          Price: 100,
          videoQuality: "Good",
          resolution: "480p",
          useDevices: ["phone", "Tablet"],
        },
        {
          device: "Basic",
          Price: 200,
          videoQuality: "Good",
          resolution: "480p",
          useDevices: ["phone", "Tablet", "Computer", "TV"],
        },
        {
          device: "Standard",
          Price: 500,
          videoQuality: "Better",
          resolution: "1080p",
          useDevices: ["phone", "Tablet", "Computer", "TV"],
        },
        {
          device: "Premium",
          Price: 700,
          videoQuality: "Best",
          resolution: "4k+HDR",
          useDevices: ["phone", "Tablet", "Computer", "TV"],
        },
      ],
      yearly: [
        {
          device: "Mobile",
          Price: 1000,
          videoQuality: "Good",
          resolution: "480p",
          useDevices: ["phone", "Tablet"],
        },
        {
          device: "Basic",
          Price: 2000,
          videoQuality: "Good",
          resolution: "480p",
          useDevices: ["phone", "Tablet", "Computer", "TV"],
        },
        {
          device: "Standard",
          Price: 5000,
          videoQuality: "Better",
          resolution: "1080p",
          useDevices: ["phone", "Tablet", "Computer", "TV"],
        },
        {
          device: "Premium",
          Price: 7000,
          videoQuality: "Best",
          resolution: "4k+HDR",
          useDevices: ["phone", "Tablet", "Computer", "TV"],
        },
      ],
    };

    res.status(200).json(plansData);
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

//?------------------------------------------
// TODO : adding the user subscription
//?------------------------------------------
module.exports.AddPlanController = async (req, res, next) => {
  try {
    const data = req.body;
    const user = req.user._id;
    data.user = user;
    data.Payment = req.body.Price;
    const userSubscriptionPlan = new subscriptionModel(data);
    await userSubscriptionPlan.save();
    await userModel.findByIdAndUpdate(user, { isSubscibe: true });
    res.status(201).json({
      success: true,
      userSubscriptionPlan,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

//?------------------------------------------
// TODO : getting user's subscription plan
//?------------------------------------------
module.exports.UserSubscriptionController = async (req, res, next) => {
  try {
    const userPlan = await subscriptionModel.findOne({ user: req.user._id });
    if (!userPlan) {
      return next(createError.BadRequest("user plan not exist"));
    }
    res.status(200).json({
      success: true,
      userPlan,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

//?------------------------------------------
// TODO : getting user's subscription plan
//?------------------------------------------
module.exports.CancelSubscriptionController = async (req, res, next) => {
  try {
    const userPlan = await subscriptionModel.findOne({ user: req.user._id });
    if (!userPlan) {
      return next(createError.BadRequest("user plan not exist"));
    }

    await subscriptionModel.findOneAndUpdate(
      { user: req.user._id },
      {
        subscriptionCanceled: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "successfully canceled the subscription",
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};
