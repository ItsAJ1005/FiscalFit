const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

router.post("/add",postController.createPost);

router.get("/getallpost",postController.getAllPosts)
module.exports = router;