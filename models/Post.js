const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    up: { type: Number, default: 0 },
    down: { type: Number, default: 0 },
    isBanned: { type: String, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "naiveUser",
      required: true,
    },
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Community'
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
