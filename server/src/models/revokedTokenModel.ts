import mongoose from "mongoose";

export interface IRevokeToken extends mongoose.Document{
    token:string,
    expiresAt:Date
}

const revokeTokenSchema = new mongoose.Schema<IRevokeToken>({
    token:{type:String, required:true},
    expiresAt:{type:Date,required:true}
})

revokeTokenSchema.index({expiresAt:1},{expireAfterSeconds:0});

module.exports =  mongoose.model<IRevokeToken>("RevokedToken",revokeTokenSchema);