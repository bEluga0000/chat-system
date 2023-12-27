import JionRoom from "@/components/joinRoom"
import Topbar from "@/components/Topbar"
import { BASE_URL } from "@/config"
import { isUserLoading} from "@/store/selector/userstates"
import { Card, CircularProgress, Typography } from "@mui/material"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useRecoilValue } from "recoil"
import style from "../styles/allPages.module.css"
interface RoomProps{
    _id:string,
    name:string,
    createdBy:string
}
export default function AllRooms()
{
    const [rooms,setrooms] = useState<null|RoomProps[]>(null)
    const[loading,setLoading] = useState<null|boolean>(null)
    useEffect(()=>{
        const init =async ()=>{
            try
            {
                const res = await axios.get(`${BASE_URL}/rooms/allRooms`, {
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                })
                if(res.data)
                {
                    setrooms(res.data.rooms)
                    setLoading(false)
                }
                else
                {
                    setrooms(null)
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
                        alert(`Error Response:${axiosError.response.message}`)
                    }
                }
            }
        }
        init()
    },[])
    const userloading = useRecoilValue(isUserLoading)
    if (userloading||loading) {
        return <CircularProgress />
    }
    else {
        return (
            <Card className={style.room}>
                <div>
                    <Topbar />
                </div>
                <hr />
                <div style={{ overflowY: 'auto', minHeight: '85%' }}>
                    {rooms !== null && rooms.length === 0 && <Typography variant="h2">No rooms you are created</Typography>}
                    {rooms !== null && rooms.length > 0 &&
                        rooms.map((room) => {
                            return (
                                <div>
                                    <JionRoom key={room._id} id={room._id} name={room.name} createdby={room.createdBy} />
                                    <hr />
                                </div>
                                

                            )
                        })
                    }
                </div>
            </Card>
        )
    }
} 