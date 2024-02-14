const express = require("express");
const { createBlog, allBlogs } = require("../controllers/BlogController");
const { isAuthenticatedUser } = require("../middlewares/isAuthenticated");
const router = express.Router();

router.route("/create").post(isAuthenticatedUser, createBlog);
router.route("/blogs").get(isAuthenticatedUser, allBlogs);

module.exports = router;
