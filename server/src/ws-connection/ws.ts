// import { user } from ".."

import { RedisSubscriptionManager } from "../redis/redis"

export const wsOnconnection = (ws:any,req:any)=>{
    ws.on('message',(message:string)=>{
        const data = JSON.parse(message.toString())
        if(data.type === 'join')
        { 
            RedisSubscriptionManager.getInstance().subscribe(data.payload.id.toString(), data.payload.roomId, ws);
            ws.send("joined successfully")
        }
        if(data.type === 'message')
        {
            const roomId = data.payload.roomId
            const message = data.payload.message
            RedisSubscriptionManager.getInstance().addChatMessage(roomId,message);
            console.log(data.payload.message)
            ws.send('message')
        }
        if(data.type === 'exit')
        {
            const roomId = data.payload.roomId
            const uId = data.payload.id.toString()
            RedisSubscriptionManager.getInstance().unsubscribe(uId,roomId) 
        }
    })
}

