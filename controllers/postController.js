const Post = require('../models/Post.js');
const jwt = require("jsonwebtoken");
const naiveUser = require('../models/naiveUser');
const mongoose = require("mongoose");
const Community = require('../models/Community.js');
const User = require('../models/User.js');
exports.createPost = async (req, res) => {
    try {
        const { resourse, title, content } = req.body;
        // console.log(resourse);
        const community = await Community.findById(resourse);
        if(!community){
            return res.status(400).json({message: "Such community does not exists"});
        }
        // check if atuher is in community or not
        const newPost = new Post({title, content});
        newPost.community = resourse;
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, "Port-folio-hulala");
        const userId = decodedToken.id;
        const author = await User.findById(userId);
        if(community.members.includes(author._id) == false && author.role != "supreme"){
            return res.status(400).json({message: "You can not post in this community,As you are not part of it"});
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.error("Invalid user ID:", userId);
            return res.status(400).json({ message: "Invalid user ID" });
        }
        if (!author) {
            console.error("User not found for ID:", userId);
            return res.status(404).json({ message: "User not found" });
        }
        
        community.posts.push(newPost._id);
        newPost.user = author._id;
        await community.save();
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
        res.status(500).json({ message: "Internal server error" });
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
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.banPost = async (req,res)=>{
    try{
        const { resourse } = req.body;
        console.log(resourse);
        await Post.findByIdAndUpdate(resourse,{
            isBanned: true
        });
        res.status(200).json({message : `Successfully Banned Post ${resourse}`});
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.deletePost = async (req,res)=>{
    try{
        const {resourse} = req.body;
        const postToDelte = await Post.findByIdAndDelete(resourse);
        res.status(203).json({message: `Post with id ${resourse} deleted successfully`});
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}