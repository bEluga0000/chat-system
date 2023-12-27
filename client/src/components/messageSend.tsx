import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { SendHorizontal } from 'lucide-react';

export default function MessageSend()
{
    const [isDisable,setDisable] = useState<boolean>(true)
    const[msg,setMsg] = useState<string>("")
    useEffect(()=>{
        if(msg.length > 0)
        {
            setDisable(false)
        }
        else
        {
            setDisable(true)
        }
    },[msg])
    return(
        <div style={{width:'100%',height:'100%',display:"flex",padding:'0px 5px 5px 5px',gap:'5%'}}>
            <input type="text" style={{fontSize:'16px',paddingLeft:'5px',width:'75%',outline:'none',borderRadius:'10px'}} onChange={(e)=>{
                setMsg(e.target.value)
            }}/>
            <Button variant="contained" style={{ width: '20%', borderRadius: '10px' }} disabled={isDisable} color="secondary">{<SendHorizontal/>}</Button>
        </div>
    )
}