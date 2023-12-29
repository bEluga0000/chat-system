import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { SendHorizontal } from 'lucide-react';
import { useRecoilValue } from "recoil";
import { usernameState } from "@/store/selector/userstates";

export default function MessageSend({ws,roomid}:{ws:WebSocket|null,roomid:string|string[]|undefined})
{
    const [sendMsg, setSendMsg] = useState<string>("")
    const [isDisable,setDisable] = useState<boolean>(true)
    const username = useRecoilValue(usernameState)
    useEffect(()=>{
        if(sendMsg.length > 0)
        {
            setDisable(false)
        }
        else
        {
            setDisable(true)
        }
    },[sendMsg])
    return(
        <div style={{width:'100%',height:'100%',display:"flex",padding:'0px 5px 5px 5px',gap:'5%'}}>
            <input type="text" style={{fontSize:'16px',paddingLeft:'5px',width:'75%',outline:'none',borderRadius:'10px'}} value={sendMsg} onChange={(e)=>{
                setSendMsg(e.target.value)

            }}/>
            <Button variant="contained" style={{ width: '20%', borderRadius: '10px' }} disabled={isDisable} color="secondary" 
            onClick={()=>{
                if(ws && typeof(roomid)==="string" && username)
                {
                    ws.send(JSON.stringify({
                        type:"message",
                        payload:{
                            roomId:roomid,
                            username,
                            message:sendMsg
                        }
                    }))
                    setSendMsg("")
                }
            }}>{<SendHorizontal/>}</Button>
        </div>
    )
}