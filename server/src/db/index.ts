import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    useremail:String,
    password:String,
    username:String,
    rooms:{type:[String],default:[]},
    ws:{type:mongoose.Schema.Types.Mixed,default:null}
    
})

const roomSchema = new mongoose.Schema({
    name:String,
    subscribeUsers:{type:[String],reqiured:true},
    createdBy:String
}) 

export const User  = mongoose.model('User',userSchema) 
export const Rooms = mongoose.model('Rooms',roomSchema)