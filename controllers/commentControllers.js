const mongoose = require("mongoose");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const jwt = require("jsonwebtoken");
exports.createComment = async (req, res) => {
    const token = req.cookies.jwt;
    try {
        const { content, post } = req.body;
        const decodedToken = jwt.verify(token, "Port-folio-hulala");
        const userId = decodedToken.id;
        console.log(content);
        console.log(post);
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(401).json({ message: "Unauthorized User" });
        }
        if (!mongoose.Types.ObjectId.isValid(post)) {
            return res.status(401).json({ message: "Invalid Post" });
        }

        const parentPost = await Post.findById(post);
        if (!parentPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = new Comment({ content, post });
        newComment.user = userId;
        await newComment.save();

        parentPost.comments.push(newComment._id);

        await parentPost.save();

        return res.status(201).json({ message: "Comment successfully created" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};