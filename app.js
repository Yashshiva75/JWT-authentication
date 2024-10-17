const express = require('express')
const  routes = require('./Routes/routes')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.send.PORT || 8000
app.use(express.json())
app.use('/api/v1',routes)

//db connect 
mongoose.connect("mongodb://localhost:27017/authdb").then(()=>{
    console.log("db connected")
})

//cors
app.get('/',(req,res)=>{
    res.send("hello")
})
app.listen(port,()=>{
    console.log("server started")
})