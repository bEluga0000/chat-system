import { z } from "zod";

export const signupVaraibles = z.object({
    username:z.string().max(15),
    useremail:z.string().email(),
    password:z.string().min(4)
});
export const signinVariables = z.object({
    useremail:z.string().email(),
    password:z.string()
})

export const createRoomVars = z.object({
    name:z.string().max(50)
})
export const joinRoomsVars = z.object({
    roomId:z.string()
})