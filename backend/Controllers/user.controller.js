const userModel = require("../SchemaModels/user.model");
const Token_Verify = require("../Middlewares/TokenGenerator");
const createError = require("http-errors");

//?------------------------------------------
// TODO : controller for  login  purpose
//?------------------------------------------
module.exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(createError.BadRequest("Enter the required fields"));
    }

    const isExist = await userModel.findOne({ email }).select("+password");

    if (!isExist) {
      return next(createError.BadRequest("Email or Password is not match"));
    }

    const ispasswordmatch = await Token_Verify.passwordVerify(
      password,
      isExist.password
    );
    if (ispasswordmatch === false) {
      return next(createError.BadRequest("Email or Password is not match"));
    }

    Token_Verify.createCookie(isExist, 200, res);
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

//?------------------------------------------
// TODO : controller for  signup  purpose
//?------------------------------------------
module.exports.signupController = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return next(createError.BadRequest("Enter the required fields"));
    }

    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return next(createError.BadRequest("Email Already exist"));
    }

    const create_user = new userModel({
      name,
      email,
      password,
    });

    await create_user.save();

    Token_Verify.createCookie(create_user, 201, res);
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

//?------------------------------------------
// TODO : logout option
//?------------------------------------------
module.exports.logoutController = (req, res, next) => {
  try {
    res.clearCookie("AssesToken").status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

//?------------------------------------------
// TODO : getting user Details
//?------------------------------------------
module.exports.getUserMe = async (req, res) => {
  const user = req.user;
  res.status(200).json({ success: true, user });
};
