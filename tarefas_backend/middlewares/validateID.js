
const Task = require('../models/taskModel')

const validateId =async (req, res, next)=>{
    const {id} = req.params
    if (!id){
        return res.status(400).json({message: "Id is required"})
    }
    try{
        const task = await  Task.findById(id)
        if (!task){
            return res.status(404).json({message: "Id not found"})
        }
        next()
    } 
    catch(e){
        return res.status(400).json(e.message)
    }
}

module.exports = validateId