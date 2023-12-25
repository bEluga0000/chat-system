import { selector } from "recoil";
import { userState } from "../atom/user";

export const isUserLoading = selector({
    key:'isUserLoading',
    get:({get})=>{
        const state = get(userState)
        return state.isUserLoading
    }
}) 