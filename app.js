const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const categoriesRoutes = require("./routes/categories");
const mongoose = require("mongoose");
const MONGO_URI = "mongodb+srv://mohannedm:zip123@cluster0-usvsi.mongodb.net/courses?retryWrites=true&w=majority";

//Config
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//Middlewares
app.use((error, req, res, next)=>{
    console.log(error);
    const status = error.statusCode;
    const message = error.message;
    error.messages ? console.log(error.messages) : console.log('No messages');
    res.status(status).json({message, errors: error.messages});
})

//Routes
app.use('/auth', authRoutes);
app.use('/categories', categoriesRoutes);

mongoose.connect(MONGO_URI)
.then(result=>{
    app.listen(8000);
})
.catch(err=>console.log(err));