const express = require("express");
const {
  createBlog,
  allBlogs,
  getSingleblog,
} = require("../controllers/BlogController");
const { isAuthenticatedUser } = require("../middlewares/isAuthenticated");
const router = express.Router();

router.route("/create").post(isAuthenticatedUser, createBlog);
router.route("/blogs").get(isAuthenticatedUser, allBlogs);
router.route("/blog/:blogId").get(isAuthenticatedUser, getSingleblog);

module.exports = router;
