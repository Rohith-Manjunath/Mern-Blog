const Blog = require("../Models/BlogModel");
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

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  jwtToken("Login successful", 200, user, res);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token").status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
exports.Me = catchAsyncErrors(async (req, res, next) => {
  const { user } = req;
  if (!user) {
    return next(new ErrorHandler("Please login", 401));
  }

  res.status(200).json({
    user,
  });
});

exports.myBlogs = catchAsyncErrors(async (req, res, next) => {
  const { user } = req;
  const blogs = await Blog.find({ user: user._id });

  res.status(200).json({
    success: true,
    blogs,
  });
});
