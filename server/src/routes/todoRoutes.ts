import { authenticate } from "../middleware/authMiddleware";

const express = require('express');
const Todo = require("../models/todoModel");

const router = express.Router();

router.use(authenticate);

router.get("/todo",async(req:any,res:any)=>{
    const {status} = req.query;
    const filter:any = {owner : req.user!.id};
    if(status){
        filter.status = status
    }

    const todos = await Todo.find(filter).sort({dueDate:1});

    res.json(todos)
})

router.post("/todo/create",async(req:any,res:any)=>{
    const {title, description, status, dueDate} = req.body;
    console.log(req.body);

    if(!title){
        return res.status(400).json({message:"Title is required"});
    }
    const todo = new Todo({
        title,
        description,
        dueDate,
        status:'pending',
        owner:req.user!.id
    })
    await todo.save();
    res.status(201).json(todo);
})

router.put("/todo/:id",async(req:any,res:any)=>{
    const {id} = req.params;
    const {title, description, dueDate, status} = req.body;

    console.log(req.body)

    const todo = await Todo.find({_id:id,owner:req.user!.id})
    if(!todo){
        return res.status(404).json({message:"Todo Not Found"});
    }
    if(title !==undefined) todo.title = title;
    if(description !==undefined) todo.description = description;
    if(dueDate !==undefined) todo.dueDate = description;
    if(status !==undefined && ['pending','completed'].includes(status)){
        todo.status = status;
    }

    const updateTodo = await Todo.findByIdAndUpdate(id,{$set:req.body},{new:true})
    
    return res.json(updateTodo);
})


router.delete("/todo/:id",async(req:any,res:any)=>{
    const {id} = req.params;
    const todo = await Todo.findOneAndDelete({_id:id, owner: req.user!.id});
    if(!todo){
        return res.status(404).json({
            message:"Todo not found"
        })
    }

    res.status(200).json(todo);


})

module.exports = router;