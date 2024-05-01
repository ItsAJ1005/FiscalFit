const express = require("express");
const router = express.Router();
const { PEP,RBACMiddleware,ABACMiddleware,ChineseWallPolicy,PDP } = require("../utils/PolicyEnforcementPoint");
const isNaive = require("../middlewares/isNaive");
const isAdmin = require("../middlewares/isAdmin");
const isExpert = require("../middlewares/isExpert");
const isAdminOrExpert = require("../middlewares/isAdminOrExpert");
const rbacMiddleware = new RBACMiddleware();
const abacMiddleware = new ABACMiddleware();
const chineseWallPolicy = new ChineseWallPolicy();
const communityController = require("../controllers/communityController");

router.post("/create",isExpert,rbacMiddleware.execute("create_community"),PDP.execute,communityController.createCommunity);
router.put("/ban",isAdmin,rbacMiddleware.execute("ban_community"),PDP.execute,communityController.banCommunity);
// router.update("/update",isAdmin,rbacMiddleware.execute("update_community"),PDP.execute,communityController.updateCommunity);
router.delete("/delete",isAdminOrExpert,chineseWallPolicy.execute("delete_community"),PDP.execute,communityController.deleteCommunity);
router.post("/join",rbacMiddleware.execute("join_community"),PDP.execute,communityController.joinCommunity);
module.exports = router;