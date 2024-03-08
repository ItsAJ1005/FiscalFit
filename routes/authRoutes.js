const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");
const User = require("../models/User");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/logout", authController.logout);
router.get("/users", authController.getAllUsers);
router.post("/change-password", authController.changePassword);


module.exports = router;
