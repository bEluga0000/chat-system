"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinRoomsVars = exports.createRoomVars = exports.authVaraibles = void 0;
const zod_1 = require("zod");
exports.authVaraibles = zod_1.z.object({
    useremail: zod_1.z.string().email(),
    password: zod_1.z.string().min(4)
});
exports.createRoomVars = zod_1.z.object({
    name: zod_1.z.string().max(50)
});
exports.joinRoomsVars = zod_1.z.object({
    roomId: zod_1.z.string()
});
