import { z } from "zod";

export const authVaraibles = z.object({
    useremail:z.string().email(),
    password:z.string().min(4)
});

export const createRoomVars = z.object({
    name:z.string().max(50)
})
export const joinRoomsVars = z.object({
    roomId:z.string()
})