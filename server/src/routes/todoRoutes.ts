import { authenticate } from "../middleware/authMiddleware";

const express = require('express');
const Todo = require("../models/todoModel");

const router = express.Router();

router.use(authenticate);

router.get("/todo",async(req:any,res:any)=>{
    console.log("I have been hit");
    const {status} = req.query;
    const filter:any = {owner : req.user!.id};
    if(status){
        filter.status = status
    }

    const todos = await Todo.find(filter).sort({dueDate:1});

    res.json(todos)
})

// router.get("/todo", async (req: any, res: any) => {
//     const { status, page = 1, limit = 10 } = req.query;
  
//     const filter: any = { owner: req.user!.id };
//     if (status) {
//       filter.status = status;
//     }
  
//     const pageNumber = parseInt(page as string, 10);
//     const limitNumber = parseInt(limit as string, 10);
  
//     try {
//       const todos = await Todo.find(filter)
//         .sort({ dueDate: 1 })
//         .skip((pageNumber - 1) * limitNumber)
//         .limit(limitNumber);
  
//       const total = await Todo.countDocuments(filter);
  
//       res.json({
//         data: todos,
//         total,
//         page: pageNumber,
//         totalPages: Math.ceil(total / limitNumber),
//       });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

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
    const todo = await Todo.find({_id:id,owner:req.user!.id})
    if(!todo){
        return res.status(404).json({message:"Todo Not Found"});
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