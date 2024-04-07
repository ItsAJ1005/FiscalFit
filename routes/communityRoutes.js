const express = require("express");
const router = express.Router();
const { PEP,RBACMiddleware,ABACMiddleware,ChineseWallPolicy,PDP } = require("../utils/PolicyEnforcementPoint");
const isNaive = require("../middlewares/isNaive");
const isAdmin = require("../middlewares/isAdmin");
const isExpert = require("../middlewares/isExpert");
const rbacMiddleware = new RBACMiddleware();
const abacMiddleware = new ABACMiddleware();
const communityController = require("../controllers/communityController");

router.post("/create",isExpert,rbacMiddleware.execute("create_community"),PDP.execute,communityController.createCommunity);
router.put("/ban",isAdmin,rbacMiddleware.execute("ban_community"),PDP.execute,communityController.banCommunity);
module.exports = router;