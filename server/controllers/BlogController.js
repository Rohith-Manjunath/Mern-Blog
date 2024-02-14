const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Blog = require("../Models/BlogModel");

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
  const blogs = await Blog.find();
  res.status(200).json({
    success: true,
    blogs,
  });
});
