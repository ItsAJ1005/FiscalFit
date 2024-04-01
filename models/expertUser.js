const mongoose = require('mongoose');
const User = require('./User');

const expertUserSchema = mongoose.Schema({
    clients : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const expertUser = User.discriminator('expertUser',expertUserSchema);

module.exports = expertUserSchema;