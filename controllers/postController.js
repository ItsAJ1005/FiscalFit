const Post = require('../models/Post.js');
const jwt = require("jsonwebtoken");
const naiveUser = require('../models/naiveUser');
const mongoose = require("mongoose");
const Community = require('../models/Community.js');
exports.createPost = async (req, res) => {
    try {
        const { resourse, title, content } = req.body;
        console.log(resourse);
        const community = await Community.findById(resourse);
        console.log(community);
        // console.log(2);
        if(!community){
            return res.status(400).json({message: "Such community does not exists"});
        }
        // console.log(3);
        const newPost = new Post({title, content});
        newPost.community = resourse;
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, "Port-folio-hulala");
        const userId = decodedToken.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.error("Invalid user ID:", userId);
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const author = await naiveUser.findById(userId);
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
                                    .populate("user")
                                    .populate("community");
        res.status(200).json(userPost);
    }catch(err){
        console.error(err);
    }
};

exports.banPost = async (req,res)=>{
    try{
        const { resourse } = req.body;
        const postToBan = await Post.findByIdAndUpdate(resourse,{
            isBanned: true
        });
        res.status(200).json({message : `Successfully Banned Post ${resourse}`});
    }catch(err){
        console.error(err);
    }
}

exports.deletePost = async (req,res)=>{
    try{
        const {resourse} = req.body;
        const postToDelte = await Post.findByIdAndDelete(resourse);
        res.status(203).json({message: `Post with id ${resourse} deleted successfully`});
    }catch(err){
        console.log(err);
    }
}