const mongoose = require('mongoose')
const dotenv = require('dotenv').config()


const connectDb = async ()=> {
    const uri = process.env.URI
    try{
        mongoose.connect(uri)
        console.log("Conectado ao MongoDB")
    }
    catch(e){
        console.log(e)
    }
}

module.exports = connectDb