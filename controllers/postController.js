const Post = require('../models/Post.js');
const jwt = require("jsonwebtoken");
const User = require('../models/User');

exports.createPost = async (req,res) => {
    try{
        const { party,title,content,up,down } = req.body;
        const newPost = new Post({party,title,content,up,down});
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token,"Port-folio-hulala");
        const id = decodedToken.id;
        const auther = await User.findById(id);
        if(!auther){
            console.error("User not found");
        }else{
            newPost.user = auther._id;
            await newPost.save();
            res.status(201).json({message: "Post added successfully"});
        }
    }catch(err){
        console.error(err);
    }
}

exports.getAllPosts = async (req,res) =>{
    try{
        const Posts = await Post.find();
        res.status(200).json({data: Posts});
    }catch(err){
        console.error(err);
    }
}