const mongoose = require('mongoose');
const naiveUser = require('./naiveUser');

const expertUserSchema = mongoose.Schema({
    clients : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'naiveUser'
    }]
})

const expertUser = User.discriminator('expertUser',expertUserSchema);

module.exports = expertUser;