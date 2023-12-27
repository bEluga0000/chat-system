import { Card ,Button} from "@mui/material";
import style from "../styles/allPages.module.css"
import CreateRoomTopBar from "@/components/topBarCR";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/config";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "@/store/atom/user";
import { useRouter } from "next/navigation";
export default function CreateRoom()
{
    const router = useRouter()
    const setUser = useSetRecoilState(userState)
    const[roomName,setRoomName] = useState<string>("")
    const [isValid, setValid] = useState <boolean>(false)
    useEffect(()=>{
        setValid(roomName.length > 0 && roomName.length < 50 && /^[^\s]/.test(roomName))
    })
    return(
        <Card className={style.room}>
            <div style={{height:'22%'}}>
                <CreateRoomTopBar/>
            </div>
            <hr />
            <div style={{height:'77%',border:'1px solid black',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2rem'}}>
                <input type="text" placeholder="Room Name" style={{width:'60%',fontSize:'25px',padding:'.2rem .5rem'}} onChange={(e)=>{
                    setRoomName(e.target.value)
                }}/>
                <Button variant="contained" disabled={!isValid} style={{ width: '60%' }} onClick={async()=>{
                    try{
                        const res = await axios.post(`${BASE_URL}/rooms/createRoom`,{
                            name:roomName
                        },{
                            headers:{
                                authorization:localStorage.getItem('token')
                            }
                        })
                        if(res.data)
                        {
                            setUser({
                                isUserLoading:false,
                                username:res.data.user.username,
                                userId:res.data.user._id,
                                subRooms:res.data.roomDetails
                            })
                            router.push('/dashboard')
                        }
                    }
                    catch(err)
                    {
                        if(axios.isAxiosError(err))
                        {
                            const axiosError = err as AxiosError
                            if(axiosError.response)
                            {
                                alert(`Error response: ${axiosError.response.message}`)
                            }
                        }
                    }
                }}>{<Plus />}&nbsp;&nbsp;CreateRoom</Button>
            </div>
        </Card>
    )
} 