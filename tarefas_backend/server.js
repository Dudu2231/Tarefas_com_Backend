const express  = require("express")
const router = require("./Routes/userRoutes")
const dotenv = require("dotenv").config()
const connectDb = require('./config/dbConfig')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/', router)
connectDb()

app.listen(PORT, ()=>{
    console.log("Rodando server na porta:" + PORT)
})