const mongoose = require("mongoose");
const { Asset,assetSchema } = require('./Asset.js');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true,unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, require:true}
});
userSchema.methods.updatePassword = async function (newPassword) {
  this.password = await bcrypt.hash(newPassword, 10);
  await this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
