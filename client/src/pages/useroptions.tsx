import Topbar from "@/components/Topbar";
import { Button, Card } from "@mui/material";
import { LogOut, Plus } from "lucide-react";
import { useRouter } from "next/router";
import style from "../styles/allPages.module.css"
import { MessageSquarePlus } from 'lucide-react';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "@/store/atom/user";
import { usernameState } from "@/store/selector/userstates";
export default function UserOptions()
{
    const username = useRecoilValue(usernameState)
    const router = useRouter()
    const setUser = useSetRecoilState(userState)
    return(
        <Card className={style.room}>
            <div>
                <Topbar/>
            </div>
            <hr />
            <div style={{display:'flex',flexDirection:'column',alignItems:'start',width:'100%',gap:'2rem'}}>
                <Button style={{width:'60%'}} onClick={()=>{
                    router.push('/createRoom')
                }}>{<Plus/>}&nbsp;&nbsp;Create Room</Button>
                <Button style={{ width: '60%' ,textAlign:'left'}} onClick={()=>{
                    localStorage.setItem('token',"")
                    setUser({
                        isUserLoading: false,
                        username: null,
                        userId: null,
                        subRooms: null
                    })

                    router.push("/")
                }}>{<LogOut />}&nbsp;&nbsp;Logout</Button>
                <Button style={{ width: '60%', textAlign: 'left' }} onClick={async() => {
                    
                    
                    router.push("/allRooms")
                }}>{<MessageSquarePlus />}&nbsp;&nbsp;allRooms</Button>
            </div>
        </Card>
    )
}