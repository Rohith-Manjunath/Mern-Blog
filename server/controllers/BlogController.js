const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Blog = require("../Models/BlogModel");
const ErrorHandler = require("../utils/ErrorHandler");

exports.createBlog = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "test",
    width: 400,
    height: 400,
    crop: "scale",
  });

  const { title, description } = req.body;
  const userId = req.user._id; // Accessing the user's _id directly

  const newBlog = await Blog.create({
    title,
    description,
    user: userId, // Assigning the userId to the user field
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    newBlog,
  });
});

exports.allBlogs = catchAsyncErrors(async (req, res, next) => {
  const blogs = await Blog.find().populate("user");
  res.status(200).json({
    success: true,
    blogs,
  });
});

exports.getSingleblog = catchAsyncErrors(async (req, res, next) => {
  const { blogId } = req.params;
  const blog = await Blog.findById({ _id: blogId });
  if (!blog) {
    return next(new ErrorHandler("No blog found with this id", 404));
  }

  res.status(200).json({
    success: true,
    blog,
  });
});
