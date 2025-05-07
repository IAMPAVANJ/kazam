import mongoose from "mongoose";

export interface IToDo extends mongoose.Document{
    title:string,
    description:string,
    dueDate:Date,
    status:'pending' | 'completed',
    owner: mongoose.Types.ObjectId
}

const todoSchema = new mongoose.Schema<IToDo>({
    title:{type:String, required:true},
    description:{type:String},
    dueDate:{type:Date},
    status:{type:String, enum:['pending','completed'],default:'pending'},
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true}
})

module.exports = mongoose.model<IToDo>('Todo',todoSchema);