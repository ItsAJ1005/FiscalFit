const mongoose = require("mongoose");
const Community = require("../models/Community");
const jwt = require("jsonwebtoken");
const validation = require("../utils/Validation");
const Validation = new validation();


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