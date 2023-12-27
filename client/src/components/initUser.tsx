import { BASE_URL } from "@/config"
import { userState } from "@/store/atom/user"
import axios from "axios"
import { useEffect } from "react"
import { useSetRecoilState } from "recoil"

export default function InitUser()
{
    const setUser = useSetRecoilState(userState)
    useEffect(()=>{
        const init = async()=>{
            try{
                const res = await axios.get(`${BASE_URL}/user/me`,{
                    headers:{
                        authorization:localStorage.getItem('token')
                    }
                })
                if(res.data)
                {
                    setUser({
                        isUserLoading:false,
                        username:res.data.username,
                        userId:res.data.userId,
                        subRooms:res.data.rooms
                    })
                }
                else
                {
                    setUser({
                        isUserLoading:false,
                        username:null,
                        userId:null,
                        subRooms:null
                    })
                }
            }
            catch(err)
            {
                console.log(err)
                setUser({
                    isUserLoading:false,
                    username:null,
                    userId:null,
                    subRooms:null
                })
            }
        } 
        init()
    },[])
    return <></>
}