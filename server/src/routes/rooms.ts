import express from 'express'
import { Rooms, User } from '../db'
import { authentication } from '../middlewares/auth'
import { createRoomVars, joinRoomsVars } from '../zodvariables/variables'
const router = express.Router()

router.get(`/allRooms`,authentication,async(req,res)=>{
    const userId = req.headers["userId"]
    try
    {
        const rooms = await Rooms.find({subscribeUsers:{$nin:[userId]}}).select('_id name createdBy')
        res.status(201).json({ rooms })
    }
    catch(err)
    {
        res.status(501).json({message:"server Error"})
    }

})
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
            const createUsername =await User.findById(createdUserId)
            if(!createUsername)
            {
                res.status(404).json({message:'User Not found'})
            }
            const newRoom = new Rooms({ name, subscribeUsers: [createdUserId], createdBy: createUsername?.username })
            await newRoom.save()
            const user = await User.findByIdAndUpdate(createdUserId, { $push: { rooms: newRoom._id } }, { new: true })
            const subRooms = user?.rooms
            const roomDetails = await Rooms.find({_id:{$in:subRooms}}).select('_id name createdBy')
            res.status(201).json({ roomId: newRoom._id ,user,roomDetails})
        }
        catch(err)
        {
            res.status(501).send(err)
        }
        
    }
})

router.get('/roomDetails/:roomId',authentication,async (req,res)=>{
    const roomId = req.params.roomId
    const userId = req.headers['userId']
    const room = await Rooms.findById(roomId)
    if(!room)
    {
        res.status(404).json({message:'Room Not found'})
        return;
    }
    if(typeof(userId) === 'string')
    {
        const isUserSubscribed = room.subscribeUsers.includes(userId)
        if (!isUserSubscribed) {
            res.status(401).json({ message: 'You are not authenticated to get the room Details' })
        }
        else
        {
            const subUsers = room.subscribeUsers
            const subUserNames = await User.find({_id:{$in:subUsers}}).select('username').lean()
            res.status(201).json({roomId:room._id,name:room.name,createdBy:room.createdBy,subUserNames})
        }
    }
    else
    {
        res.status(401).json({message:'Invalid UserId'})
    }
    
})
router.get('/:roomId',authentication,async(req,res)=>{
    const roomId = req.params.roomId
    const room =await Rooms.findById(roomId).select('_id name')
    if(!room)
    {
        res.status(404).json({message:'Room not found'})
        return
    } 
    res.status(201).json({room})
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
                        const user = await User.findByIdAndUpdate(userId, { $push: { rooms: roomId } }, { new: true })
                        const room = await Rooms.findByIdAndUpdate(roomId, { $push: { subscribeUsers: userId } }, { new: true })
                        const subRooms = user?.rooms
                        const roomDetails = await Rooms.find({_id:{$in:subRooms}}).select('_id name createdBy')
                        res.status(201).json({ message: 'Room created successfully', user ,roomDetails})
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
                await Rooms.findByIdAndUpdate(roomId, { $pull: { subscribeUsers: userId } }, { new: true })
                const subRooms = user?.rooms
                const roomDetails = await Rooms.find({_id:{$in:subRooms}}).select('_id name createdBy')
                res.status(201).json({ message: 'Exited successfully', user ,roomDetails})
            } else {
                res.status(401).json({ message: 'User Already in that room' })
                return;
            }

        }


    }

})

export default router