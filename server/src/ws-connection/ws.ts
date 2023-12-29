import { RedisSubscriptionManager } from "../redis/redis"
export const wsOnconnection = (ws:any,req:any)=>{
    // const wsId = counter++;
    ws.on("message", (message: string) => {

        const data = JSON.parse(message.toString());
        if (data.type === "join") {
            RedisSubscriptionManager.getInstance().subscribe(data.payload.id.toString(), data.payload.roomId, ws);
        }
        if(data.type === 'message')
        {
            const roomId = data.payload.roomId
            const message = data.payload.message
            const username = data.payload.username
            RedisSubscriptionManager.getInstance().addChatMessage(roomId,message,username);
            
        }
        if(data.type === 'exit')
        {
            const roomId = data.payload.roomId
            const uId = data.payload.id.toString()
            RedisSubscriptionManager.getInstance().unsubscribe(uId,roomId) 
        }
    })
}

