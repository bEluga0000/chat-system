import express from 'express'
import { Rooms, User } from '../db'
import { authentication } from '../middlewares/auth'
import { createRoomVars, joinRoomsVars } from '../zodvariables/variables'
const router = express.Router()

router.post('/createRoom',authentication,async(req,res)=>{
    const parsedInputs = createRoomVars.safeParse(req.body)
    if(!parsedInputs.success)
    {
        res.status(401).json({message:'Wrong Inputs'})
    } 
    else
    {
        try{
            const { name } = parsedInputs.data
            const createdUserId = req.headers['userId']
            const newRoom = new Rooms({ name, subscribeUsers: [createdUserId], createdBy: createdUserId })
            await newRoom.save()
            const user = await User.findByIdAndUpdate(createdUserId, { $push: { rooms: newRoom._id } }, { new: true })
            res.status(201).json({ roomId: newRoom._id ,user})
        }
        catch(err)
        {
            res.status(501).send(err)
        }
        
    }
})

router.put('/join',authentication,async(req,res)=>{
    const parsedInputs = joinRoomsVars.safeParse(req.body)
    if(!parsedInputs.success)
    {
        res.status(401).json({message:'Wrong Inputs'})
    }
    else
    {
        try{
            const { roomId } = parsedInputs.data
            const userId = req.headers['userId']
            const isRoom = await Rooms.findById(roomId)
            if(!userId || Array.isArray(userId))
            {
                console.log('hi am here dude')
                res.status(401).json({message:'UserId error'})
            }
            else
            {
                if (!isRoom) {
                    res.status(404).json({ message: 'room not found' })
                    return;
                }
                else
                {
                    const userInRoom = isRoom.subscribeUsers.includes(userId)
                    if (userInRoom) {
                        res.status(401).json({ message: 'User Already in that room' })
                        return;
                    }else
                    {
                        console.log('I am running')
                        const user = await User.findByIdAndUpdate(userId, { $push: { rooms: roomId } }, { new: true })
                        const room = await Rooms.findByIdAndUpdate(roomId, { $push: { subscribeUsers: userId } }, { new: true })
                        res.status(201).json({ message: 'Room created successfully', user })
                    }
                    
                }

                
            }
            
        }
        catch(err)
        {
            console.log(err)
        }
        
    }
})

router.put('/exit/:roomId',authentication,async(req,res)=>{
    // todo i need to make some condition that if the created user leaves what next do we need to delete the whole room or do we need to keep them
    const roomId  = req.params.roomId
    const userId = req.headers['userId']
    const isRoom = await Rooms.findById(roomId)
    if (!userId || Array.isArray(userId)) {
        // console.log('hi am here dude')
        res.status(401).json({ message: 'UserId error' })
    }
    else {
        if (!isRoom) {
            res.status(404).json({ message: 'room not found' })
            return;
        }
        else {
            const userInRoom = isRoom.subscribeUsers.includes(userId)
            if (userInRoom) {
                const user = await User.findByIdAndUpdate(userId, { $pull: { rooms: roomId } }, { new: true })
                const room = await Rooms.findByIdAndUpdate(roomId, { $pull: { subscribeUsers: userId } }, { new: true })
                res.status(201).json({ message: 'Room created successfully', user })
            } else {
                res.status(401).json({ message: 'User Already in that room' })
                return;
            }

        }


    }

})

export default router