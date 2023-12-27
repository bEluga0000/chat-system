import { atom } from "recoil";

export const roomState = atom<{id:null|string,name:null|string,subUsers:null|string[],createdBy:null|string}>({
    key:'roomState',
    default:{
        id:null,
        name:null,
        subUsers:null,
        createdBy:null
    }
})