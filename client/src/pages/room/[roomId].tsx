import MessageSend from "@/components/messageSend";
import RoomTopbar from "@/components/roomTopBar";
import ShowChats from "@/components/showChats";
import { BASE_URL } from "@/config";
import { userIdState } from "@/store/selector/userstates";
import { Card, CircularProgress, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import style from "../../styles/allPages.module.css"
interface RoomProp {
    _id: string,
    name: string
}
interface WebSocketMessage {
    type: string;
    payload: MessageProps;
}
interface MessageProps{
    username:string,
    message:string,
}
export default function Rooms() {
    const userId = useRecoilValue(userIdState)
    const [isLoading, setLoading] = useState<boolean>(true)
    const [room, setRoom] = useState<null | RoomProp>(null)
    const router = useRouter()
    const [msg,setMsg] = useState<MessageProps[]>([])
  
    const { roomId } = router.query
    const [websocket,setwebsocket] =useState<WebSocket|null>(null)
    useEffect(() => {
        const init = async () => {
            if (typeof (roomId) === 'string') {
                try {
                    const res = await axios.get(`${BASE_URL}/rooms/${roomId}`, {
                        headers: {
                            authorization: localStorage.getItem('token')
                        }
                    })
                    if (res.data) {
                        setRoom(res.data.room)
                        setLoading(false)
                    }
                    else {
                        setRoom(null)
                        setLoading(false)
                    }

                }
                catch (err) {
                    setLoading(false)
                    setRoom(null)
                    if (axios.isAxiosError(err)) {
                        const axiosError = err as AxiosError
                        if (axiosError.response) {
                            alert(`Error response: ${axiosError.response.data.message}`);
                            console.log(`Status code: ${axiosError.response.status}`);
                        }

                    }
                }
            }
            else {
                setLoading(false)
                console.log("I am getting error because of this")
                setRoom(null)
            }
        }


        init()

    }, [roomId])
    
    useEffect(()=>{
        if(!websocket)
        {
            const ws = new WebSocket("ws://localhost:3000")
            if (userId) {
                ws.onopen = () => {
                    ws.send(JSON.stringify({
                        type: 'join',
                        payload: {
                            id: userId,
                            roomId: roomId
                        }
                    }))
                }
                ws.onmessage = (event) => {
                    const data: WebSocketMessage = JSON.parse(event.data)
                    if (data.type === 'message') {
                        setMsg((prevMessages) => {
                            const reversedData = [data.payload, ...prevMessages]
                            return reversedData
                        })
                    }
                }
                setwebsocket(ws)
            }

            return () => {
                
                ws.close()
                ws.send(JSON.stringify({
                    type: "exit",
                    payload: {
                        id: userId,
                        roomId: roomId
                    }
                }))
            }
        }
        
    },[roomId,userId])
    if (isLoading) {
        return <CircularProgress />
    }
    if (!room) {
        return <Typography>There is an error please refresh</Typography>
    }
    return (
        <Card className={style.room}>
            <div>
                <RoomTopbar roomId={room._id} name={room.name} />
            </div>
            <hr />
            <div style={{ display: 'flex', flexDirection: 'column-reverse', overflowY: 'auto', height: '80%' }}>
                {
                    msg.map((m)=>{
                        return(
                            <ShowChats message={m.message} uname={m.username}/>
                        )
                    })
                }
                
                
            </div>
            <div style={{ height: '8%' }}>
                <MessageSend ws={websocket} roomid={roomId}/>
            </div>
        </Card>
    )
}