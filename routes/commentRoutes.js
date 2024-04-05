const express = require("express");
const commentControllers = require("../controllers/commentControllers");
const router = express.Router();
const { PEP,RBACMiddleware,ABACMiddleware,ChineseWallPolicy,PDP } = require("../utils/PolicyEnforcementPoint");
const rbacMiddleware = new RBACMiddleware();

router.post("/add",rbacMiddleware.execute("create_comment"),PDP.execute,commentControllers.createComment);

module.exports = router;