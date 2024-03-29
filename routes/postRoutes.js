const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

router.post("/add",postController.createPost);

router.get("/getallpost",postController.getAllPosts)

// router.get("/:id",postController.getPost); // /anything leads to infinite rendering that why commented 

module.exports = router;