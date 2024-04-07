const mongoose = require('mongoose');

const communitySchema = mongoose.Schema({
    name:{
        type: String,
        unique: true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'expertUser'
    },
    members : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'naiveUser'
    }],
    posts : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }],
    isBanned : {
        type: Boolean,
        default: false
    }
});

const Community = mongoose.model("Community",communitySchema);

module.exports = Community;