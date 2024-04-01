const mongoose = require("mongoose");
const User = require("./User");
const {assetSchema} = require('./Asset');

const naiveUserSchema = mongoose.Schema({
    assets: [assetSchema], // Change this to an array of assetSchema
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }]
});

const NaiveUser = User.discriminator('naiveUser', naiveUserSchema);

module.exports = NaiveUser;
