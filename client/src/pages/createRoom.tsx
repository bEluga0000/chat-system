import { Card ,Button} from "@mui/material";
import style from "../styles/allPages.module.css"
import CreateRoomTopBar from "@/components/topBarCR";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
export default function CreateRoom()
{
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
                <Button variant="contained" disabled={!isValid} style={{ width: '60%' }}>{<Plus />}&nbsp;&nbsp;CreateRoom</Button>
            </div>
        </Card>
    )
} 