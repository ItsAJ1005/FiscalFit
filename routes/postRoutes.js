const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const { PEP,RBACMiddleware,ABACMiddleware,ChineseWallPolicy,PDP } = require("../utils/PolicyEnforcementPoint");
const isNaive = require("../middlewares/isNaive");
const isAdmin = require("../middlewares/isAdmin");
const rbacMiddleware = new RBACMiddleware();

router.post("/add",isNaive,rbacMiddleware.execute("create_post"),PDP.execute,postController.createPost);

router.get("/getallpost",isAdmin,rbacMiddleware.execute("read_post"),PDP.execute,postController.getAllPosts)

// router.get("/:id",postController.getPost); // /anything leads to infinite rendering that why commented 

module.exports = router;