const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { calculateGoldProfitForUser } = require("../controllers/assetController")
const { PEP,RBACMiddleware,ABACMiddleware,ChineseWallPolicy,PDP } = require("../utils/PolicyEnforcementPoint");
const rbacMiddleware = new RBACMiddleware();
const isAdmin = require("../middlewares/isAdmin");


router.delete("/:id",isAdmin,rbacMiddleware.execute("delete_user"),PDP.execute,userController.deleteUser);

module.exports = router;