const mongoose = require("mongoose");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const jwt = require("jsonwebtoken");

exports.createComment = async (req, res) => {
    const token = req.cookies.jwt;
    try {
        const { content, resourse } = req.body;
        const decodedToken = jwt.verify(token, "Port-folio-hulala");
        const userId = decodedToken.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(401).json({ message: "Unauthorized User" });
        }
        if (!mongoose.Types.ObjectId.isValid(resourse)) {
            return res.status(401).json({ message: "Invalid Post" });
        }

        const parentPost = await Post.findById(resourse);
        if (!parentPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = new Comment({ content, resourse });
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

exports.deleteComment = async (req,res)=>{
    const token = req.cookies.jwt;
    try{
        const { resourse } = req.body;
        const commentToDelete = await Comment.findById(resourse);
        if(commentToDelete){
            await Comment.findByIdAndDelete(resourse);
            res.status(203).json({message : `Comment successfully deleted with id ${resourse}`});
        }else{
            res.status(400).json({message : "Comment does not exists"});
        }
    }catch(err){
        console.error(err);
    }
}

exports.updateComment = async (req,res) => {
    const token = req.cookies.jwt;
    try{
        const { resourse, data } = req.body;
        const commentToUpdate = await Comment.findById(resourse);
        if(commentToUpdate){
            await Comment.findByIdAndUpdate(resourse,{
                content: data
            });
        }else{
            res.status(400).json({message : "Comment does not exists"});
        }
    }catch(err){
        console.error(err);
    }
}
exports.banComment = async (req,res)=>{
    try{
        const { resourse } = req.body;
        console.log(resourse);
        await Post.findByIdAndUpdate(resourse,{
            isBanned: true
        });
        res.status(200).json({message : `Successfully Banned Comment ${resourse}`});
    }catch(err){
        console.error(err);
    }
}
