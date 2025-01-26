const Task = require('../models/taskModel')

//controller que retornará as tasks criadas
const showTasks = async (req, res)=>{
    try{
        const tasks = await Task.find()
        res.json({tasks})
    }catch(e){
        res.status(500).json(e.message)
    }
    
}

const createTask = async (req, res)=>{
    try{
        const {title, description} = req.body
        const newTask = new Task({
            title,
            description, 
            createdAt: Date.now()
        })
        await newTask.save()
        res.status(201).json({newTask})
    }
    catch(e){
        console.log(e)
        res.status(500).json({e: e.message})
    }

}

const deleteTask = async(req, res) =>{
    try{
        const {id} = req.params
        const toDelete = await Task.findByIdAndDelete(id)
        return res.status(200).json({message: "Tarefa deletada"})
    }catch(e){
        res.status(500).json(e.message)
    }
    
}

const updateTask = async (req, res)=>{
    try {
        const {id} = req.params
        const newData = req.body
        const updatedTask = await Task.findByIdAndUpdate(id, newData, {new: true})
        return res.status(200).json({message: "task updated successfully"})
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
    

}

module.exports = {showTasks, createTask, deleteTask, updateTask}