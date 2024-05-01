const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController");
const { calculateGoldProfitForUser } = require("../controllers/assetController")
const { PEP,RBACMiddleware,ABACMiddleware,ChineseWallPolicy,PDP } = require("../utils/PolicyEnforcementPoint");
const rbacMiddleware = new RBACMiddleware();
const isNaive = require("../middlewares/isNaive");


router.get("/users",isAdmin,rbacMiddleware.execute("read_user"),PDP.execute,authController.getAllUsers);

module.exports = router;