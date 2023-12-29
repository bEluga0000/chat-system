"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsOnconnection = void 0;
const redis_1 = require("../redis/redis");
const wsOnconnection = (ws, req) => {
    // const wsId = counter++;
    ws.on("message", (message) => {
        const data = JSON.parse(message.toString());
        if (data.type === "join") {
            redis_1.RedisSubscriptionManager.getInstance().subscribe(data.payload.id.toString(), data.payload.roomId, ws);
        }
        if (data.type === 'message') {
            const roomId = data.payload.roomId;
            const message = data.payload.message;
            const username = data.payload.username;
            redis_1.RedisSubscriptionManager.getInstance().addChatMessage(roomId, message, username);
        }
        if (data.type === 'exit') {
            const roomId = data.payload.roomId;
            const uId = data.payload.id.toString();
            redis_1.RedisSubscriptionManager.getInstance().unsubscribe(uId, roomId);
        }
    });
};
exports.wsOnconnection = wsOnconnection;
