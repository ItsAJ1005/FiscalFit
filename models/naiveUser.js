const mongoose = require("mongoose");
const User = require("./User");

const { assetSchema } = require("./Asset");

const naiveUserSchema = mongoose.Schema({

    assets: [assetSchema],
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  communities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community'
  }]
});

const NaiveUser = User.discriminator("naiveUser", naiveUserSchema);

module.exports = NaiveUser;
