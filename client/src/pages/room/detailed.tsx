import RoomTopbar from "@/components/roomTopBar"
import RoomUser from "@/components/roomUser"
import { Card, Typography } from "@mui/material"
import style from "../../styles/allPages.module.css"
export default function RoomDetails()
{
    return(
    
        <Card className={style.room}>
            <div>
                <RoomTopbar />
            </div>
            <hr />
            <div style={{height:'100%',padding:'5px',display:"flex",flexDirection:'column',gap:'5%'}}>
                <div style={{height:'10%'}}>
                    <Typography variant='subtitle2' fontWeight={700}>Created By&nbsp;: <span>USerName</span></Typography>
                    <Typography variant='subtitle2' fontWeight={700}>Created on&nbsp;: <span>Date</span></Typography>
                </div>
                <div style={{height:'85%'}}>
                    <Typography variant="h6" textAlign={'center'} height={'10%'} >Users Subscribed to this room</Typography>
                    <hr />
                    <div style={{ height: '90%',overflowY:'auto'}}>
                        <RoomUser/>
                        <RoomUser />
                        <RoomUser />
                        <RoomUser />
                        <RoomUser />
                        <RoomUser />
                        <RoomUser />
                        <RoomUser />
                        <RoomUser />
                        <RoomUser />
                        <RoomUser />
                        <RoomUser />
                    </div>

                </div>
            </div>
            

        </Card>
    )
}