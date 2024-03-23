const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    party: {type: String,required: true},
    title: {type: String,required: true},
    content: {type: String,required: true},
    up: {type: Number, default: 0},
    down: {type: Number, default: 0},
    // createdAt : Time
    // updatedAt(modifiedAt) : Time 
    // is  added by mongoose and maintained
    user: { // population is used
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps: true
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;