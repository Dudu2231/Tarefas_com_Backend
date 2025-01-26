
const validateTask = (req, res, next)=>{
    const {title, description} = req.body
    if(!title || !description){
        return res.status(400).json({message: "Insert a valid title and description"})
    }
    next()
}

module.exports = validateTask