import Topbar from "@/components/Topbar";
import { Button, Card } from "@mui/material";
import { LogOut, Plus } from "lucide-react";
import { useRouter } from "next/router";
import style from "../styles/allPages.module.css"
export default function UserOptions()
{
    const router = useRouter()
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
                    router.push("/")
                }}>{<LogOut />}&nbsp;&nbsp;Logout</Button>
            </div>
        </Card>
    )
}