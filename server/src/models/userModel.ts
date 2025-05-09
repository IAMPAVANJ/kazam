import mongoose from "mongoose";
const bcrypt = require('bcrypt');
export interface IUser extends mongoose.Document{
    name:string,
    email:string,
    password:string,
    comparePassword : (password:string)=>Promise<boolean>
}

const userSchema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true}
})

userSchema.methods.comparePassword = async function(inputpassword:string):Promise<boolean> {
    return await bcrypt.compare(inputpassword,this.password);
}

module.exports =  mongoose.model<IUser>('User',userSchema);