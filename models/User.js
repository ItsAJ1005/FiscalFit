const mongoose = require("mongoose");
const Post = require("./Post");
const Comment = require("./Comment");
const Community = require("./Community");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

userSchema.methods.updatePassword = async function (newPassword) {
  this.password = await bcrypt.hash(newPassword, 10);
  await this.save();
};

userSchema.post('deleteOne',{document: false,query: true},async function(){
  await Post.deleteMany({user: this.getFilter()["_id"]});
  await Comment.deleteMany({user: this.getFilter()["_id"]});
  // no need to call next() is the parameters are less than 2
  // documents says it 
  // can not use arrow function with pre/post API 
})

userSchema.post('deleteOne',{document: false,query: true},async function(){
  await Post.deleteMany({user: this.getFilter()["_id"]});
  await Comment.deleteMany({user: this.getFilter()["_id"]});
  await Community.deleteMany({owner: this.getFilter()["_id"]});
  const communities = Community.find({members: this.getFilter()["_id"]});
  for(let idx = 0;idx < communities.length;idx++){
    communities[idx].members.splice(communities[idx].members.indexof(this.getFilter()["_id"]),1);
  }
})

const User = mongoose.model("User", userSchema);

module.exports = User;
