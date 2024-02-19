const express = require("express");
const {
  Home,
  Register,
  loginUser,
  logout,
  Me,
  myBlogs,
} = require("../controllers/UserController");
const { isAuthenticatedUser } = require("../middlewares/isAuthenticated");
const router = express.Router();

router.route("/").get(Home);
router.route("/register").post(Register);
router.route("/login").post(loginUser);
router.route("/logout").post(isAuthenticatedUser, logout);
router.route("/me").get(isAuthenticatedUser, Me);
router.route("/me/blogs").get(isAuthenticatedUser, myBlogs);

module.exports = router;
