const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const userModel = require("../SchemaModels/user.model");

//?------------------------------------------
// TODO :for authentication
//?------------------------------------------
module.exports.authentication = async (req, res, next) => {
  try {
    const { AssesToken } = req.cookies;

    const decodetoken = jwt.verify(AssesToken, "assessment");
    if (!decodetoken) {
      return next(createError.NetworkAuthenticationRequire("check the token"));
    }

    const user = await userModel.findById(decodetoken.user);
    if (!user) {
      next(createError.NotFound("user not found"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};
