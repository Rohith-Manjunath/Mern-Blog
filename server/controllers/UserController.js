const User = require("../Models/UserModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { jwtToken } = require("../middlewares/jwtToken");
const ErrorHandler = require("../utils/ErrorHandler");

exports.Home = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Home",
  });
});

exports.Register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const newuser = await User.create({
    name,
    email,
    password,
  });

  jwtToken("Registration successful", 200, newuser, res);
});
