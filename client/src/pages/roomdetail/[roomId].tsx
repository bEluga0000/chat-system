import ExitButton from "@/components/exitbutton"
import RoomTopbar from "@/components/roomTopBar"
import RoomUser from "@/components/roomUser"
import { BASE_URL } from "@/config"
import { Button, Card, CircularProgress, Typography } from "@mui/material"
import axios, {  AxiosError } from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { useEffect } from "react"
import { StringDecoder } from "string_decoder"
import style from "../../styles/allPages.module.css"
interface SubUsersProp{
    _id:string,
    username:StringDecoder
}
interface RoomProps{
    roomId:string,
    name:string,
    createdBy:string,
    subUserNames:SubUsersProp[]

}
export default function RoomDetails()
{
    const router = useRouter()
    const {roomId} = router.query 
    const [isLoading,setLoading] = useState<boolean>(true)
    const[room,setRoom] = useState<null|RoomProps>(null)
    useEffect(()=>{
        const init = async()=>{
            if(typeof(roomId) === 'string')
            {
                try{
                    const res = await axios.get(`${BASE_URL}/rooms/roomdetails/${roomId}`, {
                        headers: {
                            authorization: localStorage.getItem('token')
                        }
                    })
                    if (res.data) {
                        setRoom(res.data)
                        setLoading(false)
                    }
                    else {
                        setRoom(null)
                        setLoading(false)
                    }
                }
                catch(err)
                {
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
            
            else
            {
                setLoading(false)
                console.log("I am getting error because of this")
                setRoom(null)
            }
        }
            init()
    },[roomId])
    if(isLoading)
    {
        return <CircularProgress/>
    }
    if(!room)
    {
        return <Typography>Something went wrong</Typography>
    }
    return(
    
        <Card className={style.room}>
            <div>
                <RoomTopbar roomId={room.roomId} name={room.name}/>
            </div>
            <hr />
            <div style={{height:'100%',padding:'5px',display:"flex",flexDirection:'column',gap:'5%'}}>
                <div style={{height:'10%',display:'flex',justifyContent:'space-between'}}>
                    <Typography variant='subtitle2' fontWeight={700}>Created By&nbsp;: <span>{room.createdBy}</span></Typography>
                    {/* <Typography variant='subtitle2' fontWeight={700}>Created on&nbsp;: <span>Date</span></Typography> */}
                    <ExitButton roomId={room.roomId}/>
                </div>
                <div style={{height:'85%'}}>
                    <Typography variant="h6" textAlign={'center'} height={'10%'} >Users Subscribed to this room</Typography>
                    <hr />
                    <div style={{ height: '90%',overflowY:'auto'}}>
                        {room.subUserNames.map((users)=>{
                            return (
                                <RoomUser user= {users.username}/>
                            )
                        })}
                        
                        
                    </div>

                </div>
            </div>
            

        </Card>
    )
}