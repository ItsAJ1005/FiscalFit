const express = require("express");
const commentControllers = require("../controllers/commentControllers");
const router = express.Router();
const { PEP,RBACMiddleware,ABACMiddleware,ChineseWallPolicy,PDP } = require("../utils/PolicyEnforcementPoint");
const isAdmin = require("../middlewares/isAdmin");
const rbacMiddleware = new RBACMiddleware();
const abacMiddleware = new ABACMiddleware();

router.post("/create",abacMiddleware.execute("create_comment","post"),PDP.execute,commentControllers.createComment); // abac
router.delete("/delete",isAdmin,rbacMiddleware.execute("delete_comment"),PDP.execute,commentControllers.deleteComment);
router.put("/update",isAdmin,rbacMiddleware.execute("update_comment"),PDP.execute,commentControllers.updateComment);
router.put("/ban",isAdmin,rbacMiddleware.execute("ban_post"),PDP.execute,commentControllers.banComment);

module.exports = router;