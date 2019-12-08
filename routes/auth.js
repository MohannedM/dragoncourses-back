const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { body } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/signup", [
    body('email').trim().isEmail().withMessage("Email is invalid").custom((value, {req})=>{
        return User.findOne({email: value})
        .then(email=>{
            if(email){
                return Promise.reject("Email is already in use");
            }
        });
    }).withMessage("Email is already in use"),
    body('name').trim().isLength({min: 4}).withMessage("Full name should not be less than 4 characters."),
    body('password').trim().isLength({min: 6, max: 14}).withMessage("Password should be from 6 to 14 characters"),
    body('confirmPassword').trim().custom((value, {req})=>{
        if(value !== req.body.password){
            return false;
        }
        return true;
    })
], authController.postSignup);

router.post("/login", [
    body('email').trim().isEmail().withMessage("Email is invalid").custom((value, {req})=>{
        return User.findOne({email: value})
        .then(email=>{
            if(!email){
                return Promise.reject("Email doesn't exist.");
            }
        });
    }).withMessage("Email is already in use"),
    body('password').trim().isLength({min: 6, max: 14}).withMessage("Password should be from 6 to 14 characters")

], authController.postLogin);


module.exports = router;