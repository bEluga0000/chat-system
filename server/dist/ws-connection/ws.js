"use strict";
// import { user } from ".."
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsOnconnection = void 0;
const redis_1 = require("../redis/redis");
const wsOnconnection = (ws, req) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message.toString());
        if (data.type === 'join') {
            redis_1.RedisSubscriptionManager.getInstance().subscribe(data.payload.id.toString(), data.payload.roomId, ws);
            ws.send("joined successfully");
        }
        if (data.type === 'message') {
            const roomId = data.payload.roomId;
            const message = data.payload.message;
            redis_1.RedisSubscriptionManager.getInstance().addChatMessage(roomId, message);
            console.log(data.payload.message);
            ws.send('message');
        }
        if (data.type === 'exit') {
            const roomId = data.payload.roomId;
            const uId = data.payload.id.toString();
            redis_1.RedisSubscriptionManager.getInstance().unsubscribe(uId, roomId);
        }
    });
};
exports.wsOnconnection = wsOnconnection;
