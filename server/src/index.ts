import express from "express"
import http from 'http'
import cors from 'cors'
import { WebSocketServer } from "ws"
import { wsOnconnection } from "./ws-connection/ws"
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from "./routes/user"
import roomRouter from "./routes/rooms"
const app1 = express()
const PORT1 = 3000
dotenv.config()
app1.use(cors())
app1.use(express.json())
app1.use('/user',userRouter)
app1.use('/rooms',roomRouter)

const mongoose_url: string|undefined = process.env.MONGOOSE_URL
export const secretKey: string | undefined = process.env.SECRET_KEY

export const server = http.createServer(app1)
const wss = new WebSocketServer({ server })
wss.on('connection', (ws, req) => {
    wsOnconnection(ws, req)
})

if (mongoose_url && secretKey) {
    server.listen(PORT1, () => {
        console.log(`Server running at http://localhost:${PORT1}`)
    })
    mongoose.connect(`${mongoose_url}/Chats`, { dbName: 'Chats' }).then(() => { console.log("connected") })
}
else {
    console.log("please connect to mongoose before running and also enter the secret values")
}






// const PORT2 = 3001
// const PORT2 = 3001
// app2.listen(PORT2,()=>{
//     console.log(`Server running at http://localhost:${PORT2}`)
// })