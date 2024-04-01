const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    content: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "naiveUser",
        required: true
    },
    post : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    replies : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},{
    timestamps: true
});

const Comment = mongoose.model("Comment",commentSchema);

module.exports = Comment;