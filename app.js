const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const ejs = require("ejs");
const cookieParser = require('cookie-parser');
var globalVariables = require('./public/js/global_variables');
app.use(cookieParser())

/**changes*/
const mongoose = require("mongoose");
const assetRoutes = require("./routes/assetRoutes");
const authRoutes = require("./routes/authRoutes");

const port = 5000;
const viewspath = path.join(__dirname, "views");
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect("mongodb://0.0.0.0:27017/PersonalPortfolioSystem", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

app.use("/api/assets", assetRoutes);
app.use("/api/auth", authRoutes);
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


// discuss
app.get('/discuss',(req,res) => {
  res.render('discuss/index.ejs',{jwt:req.cookies.jwt});
})
app.listen(port, () => {
  console.log(`The server is up and running on ${port}`);
});
