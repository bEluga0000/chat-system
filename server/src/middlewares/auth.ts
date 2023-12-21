import {Request, NextFunction,Response } from "express";
import jwt  from "jsonwebtoken";
import {  secretKey } from "..";

export const authentication = (req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization
    if(authHeader && typeof authHeader=== 'string')
    {
        if(secretKey)
        {
            const token = authHeader.split(' ')[1]
            jwt.verify(token,secretKey,(err,user)=>{
                if(err)
                {
                    return res.status(401).json({err})
                }
                if(!user)
                {
                    return res.status(404).json({message:'user not exist'})
                }
                else
                {
                    if (typeof user === 'string') {
                        return res.status(404).json({ message: 'Not valid User' })
                    }
                    else
                    {
                        // count = user.id
                        req.headers["userId"] = user.id
                        next()
                    }
                }
                
            })
        }
        
    }
    else
    {
        return res.status(404).json({ message: 'Set the authorization header' })
        
    }


}