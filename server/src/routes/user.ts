import express from "express"
import { Rooms, User } from "../db"
import {signinVariables, signupVaraibles } from "../zodvariables/variables"
import jwt from 'jsonwebtoken'
import { secretKey } from ".."
import { authentication } from "../middlewares/auth"
const router = express.Router()

router.post('/signup',async (req,res)=>{
    const parsedInputs = signupVaraibles.safeParse(req.body)
    if(!parsedInputs.success)
    {
        res.status(401).json({message:'Error Wrong Inputs'})
    }
    else
    {
        const {username,useremail,password} = parsedInputs.data
        const existingUser = await User.findOne({useremail})
        const existingUsername = await User.findOne({username})
        if(!existingUser)
        {
            if(!existingUsername)
            {
                
                const newUser = new User({ username, useremail, password })
                if (secretKey) {
                    const token = jwt.sign({ id: newUser._id }, secretKey, { expiresIn: '1h' })
                    await newUser.save();
                    res.status(201).json({ message: 'USer signup successfully', token ,userId:newUser._id,username:newUser.username,rooms:[]})
                }
            }
            else
            {
                res.status(401).json({ message: 'username already exists' }) 
                
            }
            
        }
        else
        {
            const user = await User.findOne({ useremail, password })
            if (user) {
                if (secretKey) {
                    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' })
                    const subRooms = user.rooms
                    const rooms = await Rooms.find({_id:{$in:subRooms}}).select('_id name createdBy')

                    res.status(201).json({token,message:'User Logged in Sucessfully',userId:user._id,username:user.username,rooms})
                }
                
            }
            else {
                res.status(404).json({ message: 'User Already exist please login with correct password' })
            }
        }

    }

})

router.post('/signin',async(req,res)=>{
    const parsedInputs = signinVariables.safeParse(req.body)
    if(!parsedInputs.success)
    {
        res.status(401).json({message:'please enter the valid inputs'})
    }
    else
    {
        const { useremail, password } = parsedInputs.data
        const user = await User.findOne({useremail,password})
        if(user)
        {
            if(secretKey)
            {
                const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' })
                const subRooms = user.rooms
                const rooms = await Rooms.find({ _id: { $in: subRooms } }).select('_id name createdBy')
                res.status(201).json({message:'Loggedin successfully',token,usename:user.username,userId:user._id,rooms:rooms})
            }
        }
        else
        {
            const existingemail = await User.findOne({useremail})
            if(existingemail)
            {
                res.status(404).json({message:'Please enter the correct password'})
            }
            else
            {
                res.status(404).json({message:"This email is not registered"})
            }
        }
    }
})

router.get('/me',authentication,async(req,res)=>{
    const userId = req.headers['userId']
    const user = await User.findById(userId)
    if(user)
    {
        const subscribedRooms = user.rooms
        const roomDetails = await Rooms.find({_id:{$in:subscribedRooms}}).select('_id name createdBy')
        res.status(201).json({username:user.username,userId:user._id,rooms:roomDetails})
    }
    else
    {
        res.status(404).json({message:'user Not found'})
    }
})


export default router