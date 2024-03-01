const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

/**changes*/
const mongoose = require('mongoose');
const assetRoutes = require('./routes/assetRoutes');
const authRoutes = require('./routes/authRoutes');
app.use(express.json());

mongoose.connect('mongodb://0.0.0.0:27017/PersonalPortfolioSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch(err => {
  console.error('MongoDB connection failed:', err);
  process.exit(1);
});

app.use('/api/assets', assetRoutes);
app.use('/api/auth', authRoutes);
/**changes*/


const port = 5000;
const viewspath = path.join(__dirname,'views');
app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) =>{
    res.sendFile(`${viewspath}/index.html`);
})

app.listen(port,()=>{
    console.log(`The server is up and running on ${port}`);
})
