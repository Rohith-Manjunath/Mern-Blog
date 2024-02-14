const express = require("express");
const {
  Home,
  Register,
  loginUser,
  logout,
  Me,
} = require("../controllers/UserController");
const { isAuthenticatedUser } = require("../middlewares/isAuthenticated");
const router = express.Router();

router.route("/").get(Home);
router.route("/register").post(Register);
router.route("/login").post(loginUser);
router.route("/logout").post(isAuthenticatedUser, logout);
router.route("/me").get(isAuthenticatedUser, Me);

module.exports = router;
