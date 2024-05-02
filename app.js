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
const userRoutes = require("./routes/userRoutes");
const stablishConnection = require("./db/connection");

// importing Utility Classes
const Validation = require('./utils/Validation');
const { PEP,RBACMiddleware,ABACMiddleware,ChineseWallPolicy,PDP } = require("./utils/PolicyEnforcementPoint");

// importing Middlewares
const isNaive = require('./middlewares/isNaive');
const Community = require("./models/Community");

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
app.use("/api/users",userRoutes);
// Creating Instances
const rbacMiddleware = new RBACMiddleware();
const validation = new Validation();
// Pages Rendering

// main
app.get("/", async (req, res) => {
  if(!req.cookies.jwt){
    return res.render('index.ejs',{jwt: req.cookies.jwt,user: null});
  }
  const user = await validation.getUser(req.cookies.jwt);
  res.render('index.ejs',{user,jwt: req.cookies.jwt});
});
app.get("/profile",async (req,res) =>{
  if(!req.cookies.jwt){
    return res.render('profile.ejs',{jwt: req.cookies.jwt,user: null});
  }
  const user = await validation.getUser(req.cookies.jwt);
  res.render('profile.ejs',{user,jwt: req.cookies.jwt});
})
app.get('/portfolio',async (req,res)=>{
  if(!req.cookies.jwt){
    return res.render('portfolio.ejs',{jwt: req.cookies.jwt,user: null});
  }
  const user = await validation.getUser(req.cookies.jwt);
  res.render('portfolio.ejs',{user,jwt: req.cookies.jwt});
})
app.get('/screener',async (req,res)=>{
  if(!req.cookies.jwt){
    return res.render('screener.ejs',{jwt: req.cookies.jwt,user: null});
  }
  const user = await validation.getUser(req.cookies.jwt);
  res.render('screener.ejs',{user,jwt: req.cookies.jwt});
})
app.get('/gold',async (req,res)=>{
  if(!req.cookies.jwt){
    return res.render('gold.ejs',{jwt: req.cookies.jwt,user: null});
  }
  const user = await validation.getUser(req.cookies.jwt);
  res.render('gold.ejs',{user,jwt: req.cookies.jwt});
})
app.get('/login',(req,res)=>{
  res.render('login.ejs');
})
app.get('/register',(req,res)=>{
  res.render('register.ejs');
})
// admin panel
app.get('/admin',async (req,res) => {
  const naiveUser = await naiveUser.find({});
  const expertUser = await adminUser.find({});
  const communities = await Community.find({});
  const posts = await Post.find({});
  const comments = await Comment.find({});
  res.render('admin.ejs');
})
// discuss
app.get('/discuss/home',async (req,res) => {
  req.role = req.cookies.jwt ? await validation.getRole(req.cookies.jwt) : 'anonymous';
  await Post.aggregate().sample(4)
            .then((data) => res.render('discuss/index.ejs',{jwt:req.cookies.jwt,data:data,role: req.role}))
            .catch((err) => console.error(err))
});
app.get('/discuss/communities/create',(req,res)=>{
  res.render('discuss/newCommunity.ejs');
})
// This route should be kept at the very bottom to prevent /anything  // res.render("discuss/viewpost.ejs",{post,data})
app.get('/discuss/posts/:id',async (req,res)=>{
    const user = await validation.getUser(req.cookies.jwt);
    await Post.findById(req.params.id)
              .populate("user")
              .populate({
                path: 'comments',
                // Get users of the comments 
                populate: { path: 'user' }
              })
              .then(post => res.render("discuss/viewPost.ejs",{post,user}))
              .catch(err => res.render('error404.ejs'));
});
// Communities with id
app.get('/discuss/communities/:id', async (req, res) => {
  try {
    const community = await Community.findById(req.params.id)
      .populate('owner')
      .populate('members')
      .populate('posts');

    if (!community) {
      return res.render('error404.ejs');
    }
    const user = await validation.getUser(req.cookies.jwt);
    res.render("discuss/viewCommunity.ejs", { community, user });
  } catch (err) {
    console.error(err);
    return res.render("error404.ejs");
  }
});
// Rendering 404 on unregistered routes
app.all('*',(req,res)=>{
    res.render('error404.ejs');
})

// listing app on defined PORT
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});

