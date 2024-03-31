const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const ejs = require("ejs");
const cookieParser = require('cookie-parser');
var globalVariables = require('./public/js/global_variables');
app.use(cookieParser());


// importing modals
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const User = require("./models/User");
// importing Routes
const mongoose = require("mongoose");
const assetRoutes = require("./routes/assetRoutes");
const authRoutes = require("./routes/authRoutes");
const postRoutes  = require("./routes/postRoutes");
const commentRoutes = require('./routes/commentRoutes');
const stablishConnection = require("./db/connection");

// Express Configuration
const port = 5000;
const viewspath = path.join(__dirname, "views");
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Establishing the mongoose connection
stablishConnection();

app.use("/api/assets", assetRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/comments",commentRoutes);
/**changes*/

app.get("/", (req, res) => {
  res.render('index.ejs');
});
app.get('/portfolio',(req,res)=>{
  res.render('portfolio.ejs');
})
app.get('/screener',(req,res)=>{
  res.render('screener.ejs');
})
app.get('/gold',(req,res)=>{
  res.render('gold.ejs');
})
app.get('/login',(req,res)=>{
  res.render('login.ejs');
})
app.get('/register',(req,res)=>{
  res.render('register.ejs');
})
Post.findByIdAndDelete();

// discuss
app.get('/discuss',async (req,res) => {
  await Post.find({})
            .then((data) => res.render('discuss/index.ejs',{jwt:req.cookies.jwt,data:data}))
            .catch((err) => console.error(err))
});
app.get('/discuss/posts/create',(req,res)=>{
  res.render('discuss/newPost.ejs');
})
// This route should be kept at the very bottom to prevetn /anything  // res.render("discuss/viewpost.ejs",{post,data})
app.get('/discuss/posts/:id',async (req,res)=>{
  await Post.findById(req.params.id)
            .populate("user")
            .populate({
              path: 'comments',
              // Get users of the comments 
              populate: { path: 'user' }
            })
            .then(post => res.render("discuss/viewPost.ejs",{post}))
            .catch(err => console.error(err));
});
app.listen(port, () => {
  console.log(`The server is up and running on ${port}`);
});
