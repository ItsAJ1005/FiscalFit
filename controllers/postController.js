const Post = require('../models/Post.js');
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const mongoose = require("mongoose");
exports.createPost = async (req, res) => {
    try {
        const { party, title, content, up, down } = req.body;
        const newPost = new Post({ party, title, content, up, down });
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, "Port-folio-hulala");
        const userId = decodedToken.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.error("Invalid user ID:", userId);
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const author = await User.findById(userId);
        if (!author) {
            console.error("User not found for ID:", userId);
            return res.status(404).json({ message: "User not found" });
        }

        newPost.user = author._id;
        await newPost.save();

        res.status(201).json({ message: `Post added successfully with ID: ${newPost._id}` });
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllPosts = async (req,res) =>{
    try{
        const Posts = await Post.find();
        res.status(200).json({data: Posts});
    }catch(err){
        console.error(err);
    }
}

exports.getPost = async (req,res)=>{
    const id = req.params.id;
    try{
        const userPost = await Post.findById(id)
                                    .populate("user");
        res.status(200).json(userPost);
    }catch(err){
        console.error(err);
    }
};
