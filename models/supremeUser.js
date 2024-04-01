const mongoose = require('mongoose');
const naiveUser = require('./naiveUser');
const User = require("./User");

const supremeUserSchema = mongoose.Schema({
      // not thought yet
      // supreme user is allowed too make any query to dataBase, which will be handelled by dashboard backend
})

const supremeUser = User.discriminator('supremeUser',supremeUserSchema);

module.exports = supremeUser;