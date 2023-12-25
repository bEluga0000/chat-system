import express from "express"
import { User } from "../db"
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
                    res.status(201).json({ message: 'USer signup successfully', token })
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
                    res.status(201).json({token,message:'User Logged in Sucessfully'})
                }
                else
                {
                    res.status(404).json({message:'User Already exist please login with correct password'}) 
                }
            }
        }

    }

})

router.post('/signin',async(req,res)=>{
    const parsedInputs = signinVariables.safeParse(req.body)
    if(!parsedInputs.success)
    {
        res.status(401).json({message:'rong Inputs'})
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
                res.status(201).json({message:'Loggedin successfully',token})
            }
        }
        else
        {
            res.status(201).json({ message: 'Wrong credentials' })
        }
    }
})

router.get('/me',authentication,async(req,res)=>{
    const userId = req.headers['userId']
    const user = await User.findById(userId)
    if(user)
    {
        res.status(201).json({useremail:user.useremail,rooms:user.rooms})
    }
    else
    {
        res.status(404).json({message:'user Not found'})
    }
})


export default router