const mongoose = require('mongoose');
const naiveUser = require('./naiveUser');

const User = require("./User");

const expertUserSchema = mongoose.Schema({
    communities_owned : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
    }],
    clients : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'naiveUser'
    }]
})

const expertUser = User.discriminator('expertUser',expertUserSchema);

module.exports = expertUser;