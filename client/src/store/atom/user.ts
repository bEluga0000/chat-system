import { atom } from "recoil";
export const userState = atom<{isUserLoading:boolean;username:string|null,userId:string|null,subRooms:string[]|null}>({
    key:"userState",
    default:{
        isUserLoading:true,
        username:null,
        userId:null,
        subRooms:null
    }
})