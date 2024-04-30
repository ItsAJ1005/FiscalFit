const mongoose = require("mongoose");
const Community = require("../models/Community");
const jwt = require("jsonwebtoken");
const validation = require("../utils/Validation");
const User = require("../models/User");
const Validation = new validation();

exports.deleteUser = async(req,res)=>{
    try{
        const user = User.findById(req.params.id);
        if(!user._id){
            return res.status(400).json({message: "No such user exists"});
        }
        await User.deleteOne({_id:req.params.id});
        res.status(204).json({message: "User deleted successfully"});
    }catch(err){
        console.error(err);
    }
}