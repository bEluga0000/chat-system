import MessageSend from "@/components/messageSend";
import RoomTopbar from "@/components/roomTopBar";
import ShowChats from "@/components/showChats";
import { Card } from "@mui/material";
import style from "../styles/allPages.module.css"
export default function Rooms()
{
    return(
        <Card className={style.room}>
            <div>
                <RoomTopbar/>
            </div>
            <hr />
            <div style={{ display: 'flex', flexDirection: 'column-reverse', overflowY: 'auto',height:'80%' }}>
                <ShowChats/>
                <ShowChats />
                <ShowChats />
                <ShowChats />
                <ShowChats />
                <ShowChats />
                <ShowChats />
                <ShowChats />
                <ShowChats />
            </div>
            <div style={{height:'8%'}}>
                <MessageSend/>
            </div>
        </Card>
    )
}