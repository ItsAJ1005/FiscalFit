const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");
const User = require("../models/User");
const { PEP,RBACMiddleware,ABACMiddleware,ChineseWallPolicy,PDP } = require("../utils/PolicyEnforcementPoint");
const rbacMiddleware = new RBACMiddleware();
const isAdmin = require("../middlewares/isAdmin");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/logout", authController.logout);
router.get("/users",isAdmin,rbacMiddleware.execute("read_user"),PDP.execute,authController.getAllUsers);
router.post("/change-password",isAdmin,rbacMiddleware.execute("update_user"),PDP.execute,authController.changePassword);


module.exports = router;
