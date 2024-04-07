const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const { PEP,RBACMiddleware,ABACMiddleware,ChineseWallPolicy,PDP } = require("../utils/PolicyEnforcementPoint");
const isNaive = require("../middlewares/isNaive");
const isAdmin = require("../middlewares/isAdmin");
const rbacMiddleware = new RBACMiddleware();
const abacMiddleware = new ABACMiddleware();

router.post("/create",abacMiddleware.execute("create_post","community"),PDP.execute,postController.createPost); // abac
router.get("/getallpost",isAdmin,rbacMiddleware.execute("read_post"),PDP.execute,postController.getAllPosts); 
router.put("/ban",isAdmin,rbacMiddleware.execute("ban_post"),PDP.execute,postController.banPost);
// router.put("/delete",isAdmin,rbacMiddleware.execute("delete_post"),PDP.execute,postController.deletePost);

module.exports = router;