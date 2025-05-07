const {Request, Response, NextFunction} = require('express');
const jwt = require('jsonwebtoken');
const RevokedToken = require("../models/revokedTokenModel");

export async function authenticate(req:any,res:any,next:any){

    const authHeader = req.headers.authorization;
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    const isRevoked = await RevokedToken.findOne({token});
    if(isRevoked) return res.status(401).json({message:"Token has been revoked"});
    try{
        const decoded = jwt.verify(token,"accessSecret") as any;
        req.user = {id:decoded.userId}
        next();
    }catch(err){
        return res.sendStatus(403);
    }
}
