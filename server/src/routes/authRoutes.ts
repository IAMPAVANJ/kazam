const express = require('express');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const User = require("../models/userModel");
const Revoked = require("../models/revokedTokenModel");
const {generateAccessToken, generateRefreshToken, verifyRefreshToken} = require("../utils/jwt");

const router = express.Router();

router.post("/signup",async(req:any,res:any)=>{
    const {email,password} = req.body;
    const isEmailExists = await User.findOne({email:email});
    if(isEmailExists){
        return res.status(403).json({
            message:"Email Already registered"
        })
    }
    
    const passwordHash = await bcrypt.hash(password,10);
    
    try{
        const newUser = await new User({email:email,password:passwordHash});
        newUser.save();
    
        return res.status(201).json({
            message:"New User Created"
        })
    }catch(err){
        return res.status(403).json({
            message:err.message
        })
    }
})

router.post("/login",async(req:any,res:any)=>{
    const {email,password} = req.body;
    const isEmailExists = await User.findOne({email:email});
    if(!isEmailExists || (! isEmailExists.comparePassword(password))){
        return res.status(401).json({
            message:"Invalid  credentials"
        })
    }
    const accessToken = generateAccessToken(isEmailExists._id.toString());
    const refreshToken = generateRefreshToken(isEmailExists._id.toString());
    res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        sameSite:'strict',
        secure:process.env.NODE_ENV === 'production',
        maxAge: 7*24*60*60*1000
    })
    res.status(200).json({
        accessToken
    })
})

router.post("/logout",async(req:any,res:any)=>{
    const token = req.cookies.refreshToken;
    if(token){
        const decoded = jwt.decode(token) as any;
        console.log(decoded);
        await Revoked.create({
            token,
            expiresAt:new Date(decoded.exp * 1000)
        })
    }
    res.clearCookie('refreshToken');
    res.json({
        message: "Logout Successful"
    })
})

router.post("/refresh-token",async(req:any,res:any)=>{
    const token = req.cookies.refreshToken;
    if(!token) return res.sendStatus(401);

    try{
        const payLoad = verifyRefreshToken(token) as any;
        const isRevoked = await Revoked.findeOne({token});
        if(isRevoked){
            return res.status(401).json({message:"Token has been revoked"});
        }
        const accessToken = generateAccessToken(payLoad.userId);

        res.json({accessToken});
    }catch(err){
        return res.sendStatus(403)
    }
})

module.exports =  router;