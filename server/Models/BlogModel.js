const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title of your blog"],
      trim: true,
      maxlength: [60, "Title cannot exceed 60 characters"],
      minlength: [3, "Title should have atleast 3 characters"],
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
      required: [true, "Please add a description to your blog"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
