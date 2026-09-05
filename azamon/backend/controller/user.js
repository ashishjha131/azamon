const express = require("express");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {sendEmail} = require("../utils/sendEmail");

const genToken = async(id)=>{
    return jwt.sign({id}, process.env.Secret_key);
}
async function handleUserSignup(req, res){
    try{
        const {name, email, password} = req.body;
    console.log("BODY:", req.body);
    if(!name || !email || !password) return res.status(400).json({
        code: "1",
        message: "Enter all the details"
    })

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            code: "2",
            message: "user already exist"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =  await bcrypt.hash(password, salt);
    const newUser = await User.create({
        name, email, password: hashedPassword
    })

    if(newUser){
        const otp = Math.floor(100000 + Math.random() * 900000);
        const message = `${name} registered successfully
        Welcome to azamon, an full felteched e-commerce temu amazon
        your otp is ${otp}`;
        await sendEmail(email, `Welcome to a disappointing e-commerce website,
        hope you're dissatisfied`, message);
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            token: await genToken(newUser._id)
        });
    }
    }
    catch(error){
        return res.status(500).json({message:"server error", error});
    }


}

async function handleUserLogin(req,res){
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
    if(await bcrypt.compare(password, user.password)){
        res.status(200).json({
            _id: user._id,
            email: user.email,
            password: user.password,
            role: user.role,
            token: await genToken(user._id)
        })
    }else{res.status(400).json({message: "Password doesn't match"})}}
    else{
        res.status(400).json({message: "User doesn't exist"})
    }
}

async function handleGetUsers(req, res){
    const users = await User.find({}).select("-password");
    res.json(users);

}


module.exports={ handleUserSignup, 
    handleUserLogin,
    handleGetUsers    
}