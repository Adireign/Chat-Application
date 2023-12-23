import generateToken from '../config/generateToken.js'
import User from '../models/userModel.js'

const registerUser = async(req,res) =>{
    const {name,email,password,pic} = req.body

    if(!name||!email||!password){
        res.status(400)
        throw new Error("Please Enter all the details")
    }
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }
    const user = await User.create({
        name,
        email,
        password,
        pic,
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        console.log("failed to add user")
    }

}

const authUser = async(req,res)=>{
    const {email,password} = req.body
    
    const user = await User.findOne({email: email,password: password})
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid Email or Password")
    }
}

export {registerUser,authUser}