const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const ejs = require("ejs");
const cookieParser = require('cookie-parser');
const Post = require('./models/Post');
var globalVariables = require('./public/js/global_variables');
app.use(cookieParser())

/**changes*/
const mongoose = require("mongoose");
const assetRoutes = require("./routes/assetRoutes");
const authRoutes = require("./routes/authRoutes");
const postRoutes  = require("./routes/postRoutes");
const stablishConnection = require("./db/connection");

const port = 5000;
const viewspath = path.join(__dirname, "views");
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

stablishConnection();

app.use("/api/assets", assetRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts",postRoutes);
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
// This route should be kept at the very bottom to prevetn /anything 
app.get('/discuss/posts/:id',async (req,res)=>{
  await Post.findById(req.params.id)
            .populate("user")
            .then(post => res.render("discuss/viewpost.ejs",{post}))
            .catch(err => console.error(err));
});
app.get('*',(req,res)=>{
    res.render('error404.ejs');
})
app.listen(port, () => {
  console.log(`The server is up and running on ${port}`);
});
