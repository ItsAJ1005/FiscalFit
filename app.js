const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const ejs = require("ejs");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
var globalVariables = require('./public/js/global_variables');
app.use(cors());
app.use(cookieParser());

// .evn congif
dotenv.config();

// importing modals
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const naiveUser = require("./models/naiveUser");
const expertUser = require("./models/expertUser");
const supremeUser = require("./models/supremeUser");

// importing Routes
const mongoose = require("mongoose");
const assetRoutes = require("./routes/assetRoutes");
const authRoutes = require("./routes/authRoutes");
const postRoutes  = require("./routes/postRoutes");
const commentRoutes = require('./routes/commentRoutes');
const communityRoutes = require('./routes/communityRoutes');
const stablishConnection = require("./db/connection");

// importing Utility Classes
const Validation = require('./utils/Validation');
const { PEP,RBACMiddleware,ABACMiddleware,ChineseWallPolicy,PDP } = require("./utils/PolicyEnforcementPoint");

// importing Middlewares
const isNaive = require('./middlewares/isNaive');
// Express Configuration
const port = process.env.PORT ||  5000;
const viewspath = path.join(__dirname, "views");
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Establishing the mongoose connection
stablishConnection();

// Routes 

app.use("/api/assets", assetRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/communities",communityRoutes);
// Creating Instances
const rbacMiddleware = new RBACMiddleware();

// Pages Rendering

// main
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

// discuss
app.get('/discuss',async (req,res) => {
  await Post.find({})
            .then((data) => res.render('discuss/index.ejs',{jwt:req.cookies.jwt,data:data}))
            .catch((err) => console.error(err))
});
app.get('/discuss/posts/create',(req,res)=>{
  res.render('discuss/newPost.ejs');
})
app.get('/discuss/community/:id', async (req,res)=>{
    res.render("discuss/viewCommunity.ejs");
})
// This route should be kept at the very bottom to prevent /anything  // res.render("discuss/viewpost.ejs",{post,data})
app.get('/discuss/posts/:id',async (req,res)=>{
    await Post.findById(req.params.id)
              .populate("user")
              .populate({
                path: 'comments',
                // Get users of the comments 
                populate: { path: 'user' }
              })
              .then(post => res.render("discuss/viewPost.ejs",{post}))
              .catch(err => res.render('error404.ejs'));
});
// Testing 
app.get("/testrbac",isNaive,rbacMiddleware.execute("ban_post"),PDP.execute,(req,res)=>{
    res.send("Rbac Implemented Successfully");
})
// Rendering 404 on unregistered routes
app.all('*',(req,res)=>{
    res.render('error404.ejs');
})

// listing app on defined PORT
app.listen(port, () => {
  console.log(`The server is up and running on ${port}`);
});
