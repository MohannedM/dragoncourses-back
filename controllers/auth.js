const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.postSignup = async function (req, res, next) {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error("Input Validation Failed");
        error.statusCode = 400;
        return next(error);
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        const savedUser = await user.save();
        res.status(201).json({message: "User Created Successfully", userId: savedUser._id})
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.postLogin = async function (req, res, next){
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error("Input Validation Failed");
        error.statusCode = 400;
        error.messages = errors.array(); 
        return next(error);
    }
    try{
        const user = await User.findOne({email});
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual){
            const error = new Error("Password is incorrect!");
            error.statusCode = 403;
            return next(error);
        }

        const token = jwt.sign({
            userId: user._id.toString(),
            name: user.name,
            email: user.email,
            is_admin: user.is_admin,
            expiresIn: 3600
        },'somesecret', {expiresIn: '1h'});
        res.status(200).json({token: token, userId: user._id.toString(), name: user.name, email: user.email, is_admin: user.is_admin, expiresIn: 3600});

    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        } 
        next(err);
    }
}