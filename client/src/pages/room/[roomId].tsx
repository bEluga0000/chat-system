import MessageSend from "@/components/messageSend";
import RoomTopbar from "@/components/roomTopBar";
import ShowChats from "@/components/showChats";
import { BASE_URL } from "@/config";
import { Card, CircularProgress, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import style from "../../styles/allPages.module.css"
interface RoomProp {
    _id: string,
    name: string
}
export default function Rooms() {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [room, setRoom] = useState<null | RoomProp>(null)
    const router = useRouter()
    const { roomId } = router.query
    useEffect(() => {
        const init = async () => {
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
                else
                {
                    setRoom(null)
                    setLoading(false)
                }
                
            }
            catch(err)
            {
                setLoading(false)
                setRoom(null)
                if(axios.isAxiosError(err))
                {
                    const axiosError = err as AxiosError
                    if(axiosError.response)
                    {
                        alert(`Error response: ${axiosError.response.data.message}`);
                        console.log(`Status code: ${axiosError.response.status}`);
                    }
                    
                }
            }
        }
        init()

    },[roomId])
    if (isLoading) {
        return <CircularProgress />
    }
    if(!room)
    {
        return <Typography>There is an error please refresh</Typography>
    }
    return (
        <Card className={style.room}>
            <div>
                <RoomTopbar roomId={room._id} name={room.name}/>
            </div>
            <hr />
            <div style={{ display: 'flex', flexDirection: 'column-reverse', overflowY: 'auto', height: '80%' }}>
                <ShowChats />
                <ShowChats />
                <ShowChats />
                <ShowChats />
                <ShowChats />
                <ShowChats />
                <ShowChats />
                <ShowChats />
                <ShowChats />
            </div>
            <div style={{ height: '8%' }}>
                <MessageSend />
            </div>
        </Card>
    )
}