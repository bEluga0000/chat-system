import express from "express"
import { User } from "../db"
import { authVaraibles } from "../zodvariables/variables"
import jwt from 'jsonwebtoken'
import { secretKey, server } from ".."
import { authentication } from "../middlewares/auth"
import { WebSocketServer } from "ws"
import { wsOnconnection } from "../ws-connection/ws"
const router = express.Router()

router.post('/signup',async (req,res)=>{
    const parsedInputs = authVaraibles.safeParse(req.body)
    if(!parsedInputs.success)
    {
        res.status(401).json({message:'Error Wrong Inputs'})
    }
    else
    {
        const {useremail,password} = parsedInputs.data
        const existingUser = await User.findOne({useremail})
        if(!existingUser)
        {
            const newUser = new User({useremail,password})
            if(secretKey)
            {
                const token = jwt.sign({id:newUser._id},secretKey,{expiresIn:'1h'})
                await newUser.save();
                res.status(201).json({message:'USer signup successfully',token})
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
                    res.status(404).json({message:'User Already exist please login'}) 
                }
            }
        }

    }

})

router.post('/signin',async(req,res)=>{
    const parsedInputs = authVaraibles.safeParse(req.body)
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