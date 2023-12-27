import { Button, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { KeyRound } from 'lucide-react';
import axios from "axios";
import { CircleDashed } from 'lucide-react';
import { BASE_URL } from "@/config";
import { useSetRecoilState } from "recoil";
import { userState } from "@/store/atom/user";
import { useState } from "react";
export default function JionRoom({ id, name, createdby }: { id: any, name: any, createdby: any })
{
    const[loading,setLoading] = useState<boolean>(false)
    const route = useRouter()
    const setUser = useSetRecoilState(userState)
    return (
        <div style={{ padding: '1rem', cursor: 'pointer',display:'flex' ,alignItems:'center',justifyContent:'space-between'}} >
            <div>
                <Typography variant='h6'>
                    {name}
                </Typography>
                <Typography variant="subtitle2">created By: <span style={{ fontSize: '20px' }}>{createdby}</span></Typography>
                
            </div>
            <div>
                <Button variant="contained" color="success" id={id} onClick={async(e)=>{
                    setLoading(true)
                    const roomId = e.currentTarget.id
                    try
                    {
                        const res = await axios.put(`${BASE_URL}/rooms/join`,{
                            roomId:id
                        },{
                            headers:{
                                authorization:localStorage.getItem('token')
                            }
                        })
                        if(res.data)
                        {
                            setLoading(false)
                            setUser({
                                isUserLoading:false,
                                username:res.data.user.username,
                                userId:res.data.user._id,
                                subRooms:res.data.roomDetails
                            })
                            route.push('/dashboard')
                        }
                        else
                        {
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
                                alert(`error response:${axiosError.response.message}`)
                            }
                        }
                        setLoading(false)
                    }
                }}>{loading ? <CircleDashed/>:<KeyRound/>}</Button>
            </div>
        </div>
    )
}