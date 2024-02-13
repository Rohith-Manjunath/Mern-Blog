const express = require("express");
const { Home, Register } = require("../controllers/UserController");
const router = express.Router();

router.route("/").get(Home);
router.route("/register").post(Register);

module.exports = router;
