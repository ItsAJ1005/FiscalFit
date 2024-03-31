const express = require("express");
const commentControllers = require("../controllers/commentControllers");
const router = express.Router();

router.post("/add",commentControllers.createComment);

module.exports = router;