const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const port = 5000;
const viewspath = path.join(__dirname,'views');
app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) =>{
    res.sendFile(`${viewspath}/index.html`);
})

app.listen(port,()=>{
    console.log(`The server is up and running on ${port}`);
})