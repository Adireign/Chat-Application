import express from 'express'
import chats from './data/data.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import chalk from 'chalk'
import {registerUser,authUser} from './APIS/auth.js'
import User from './models/userModel.js'
// import authUser from './APIS/auth.js'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000

// for connecting database
connectDB()

app.use(express.json())

app.post("/api/user",registerUser)
app.post("/api/user/login",authUser)



app.get("/",(req,res)=>{
    res.send("api is running")
})
app.get("/api/chat",(req,res)=>{
    res.send(chats)
})
app.get("/api/chat/:id",(req,res)=>{
    // console.log(req.params.id)
    const singleChat = chats.filter((element)=>{
        return element._id == req.params.id
    })
    res.send(singleChat)
})



app.listen(PORT,()=>{
    console.log(chalk.red.bold(`Server running at port: ${PORT}`))
})