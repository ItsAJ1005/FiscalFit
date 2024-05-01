const mongoose = require("mongoose");
const Community = require("../models/Community");
const jwt = require("jsonwebtoken");
const validation = require("../utils/Validation");
const Validation = new validation();
const naiveUser = require('../models/naiveUser');

exports.createCommunity = async (req,res)=>{
    try{
        const { name } = req.body;
        const existingCommunity = await Community.findOne({name});
        if(existingCommunity){
            res.status(400).json({message : "Choose different name, community Already exists"});
        }else{
            const token = req.cookies.jwt;
            const decodedToken = await Validation.getPayload(token);
            const newCommunity = new Community({name});
            newCommunity.owner = decodedToken.id;
            newCommunity.members.push(decodedToken.id);
            await newCommunity.save();
            res.status(201).json({ message: `Community added successfully with ID: ${newCommunity._id}` });
        }
    }catch(err){
        console.error(err);
    }
}

exports.banCommunity = async (req,res)=>{
    try{
        const { resourse } = req.body;
        await Community.findByIdAndUpdate(resourse,{
            isBanned: true
        });
        res.status(200).json({message : `Successfully Banned Community ${resourse}`});
    }catch(err){
        console.error(err);
    }
}

exports.deleteCommunity = async (req,res)=>{
    try{
        const {resourse} = req.body;
        await Community.findByIdAndDelete(resourse);
        res.status(204).json({message : `Successfully Community with id ${resourse} deleted`});
    }catch(err){
        console.error(err);
        res.status(500).json({message : "Internal Server Error"});
    }
}

exports.joinCommunity = async (req,res)=>{
    try{
        const { resourse } = req.body || req.params;
        const token = req.cookies.jwt;
        const decodedToken = await Validation.getPayload(token);
        const userId = decodedToken.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.error("Invalid user ID:", userId);
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const user = await naiveUser.findById(userId);
        if (!user) {
            console.error("User not found for ID:", userId);
            return res.status(404).json({ message: "Either User not found or Expert can not join community" });
        }
        const community = await Community.findById(resourse);
        if(!community){
            return res.status(400).json({message : "Such Community does not exists"});
        }
        if(community.members.includes(userId)){
            return res.status(400).json({message : "You are already a member of this community"});
        }
        community.members.push(userId);
        user.communities.push(resourse);
        await user.save();
        await community.save();
        res.status(200).json({message : "Successfully joined community"});
    }catch(err){
        console.error(err);
        res.status(500).json({message : "Internal Server Error"});
    }
}
