import { selector } from "recoil";
import { userState } from "../atom/user";

export const usernameState = selector({
    key: 'usernameState',
    get: ({ get }) => {
        const state = get(userState)
        return state.username
    }
})

export const isUserLoading = selector({
    key: 'isUserLoading',
    get: ({ get }) => {
        const state = get(userState)
        return state.isUserLoading
    }
}) 
export const userIdState = selector({
    key:'userIdState',
    get:({get})=>{
        const state = get(userState)
        return state.userId
    }
})

export const subscribedRooms = selector({
    key:'subscribedRooms',
    get:({get})=>{
        const state = get(userState)
        return state.subRooms
    }
})