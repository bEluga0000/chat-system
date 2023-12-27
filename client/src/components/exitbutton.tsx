import { BASE_URL } from "@/config";
import { userState } from "@/store/atom/user";
import { Button } from "@mui/material";
import axios, { AxiosError } from "axios";
import { LogOut } from 'lucide-react';
import { useRouter } from "next/navigation";
import {  useSetRecoilState } from "recoil";
export default function ExitButton({roomId}:{roomId:string}){
    const router = useRouter()
    const setUser = useSetRecoilState(userState)
    return(
        <Button variant="contained" id={roomId} color="error" onClick={async(e)=>{
            try
            {
                const roomid = e.currentTarget.id
                const res = await axios.put(`${BASE_URL}/rooms/exit/${roomid}`, {},{
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                })
                if (res.data) {
                    setUser({
                        isUserLoading: false,
                        username: res.data.user.username,
                        userId: res.data.user._id,
                        subRooms: res.data.roomDetails
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
            
            
        }} ><LogOut/></Button>
    )
}