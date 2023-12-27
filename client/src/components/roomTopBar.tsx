import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import LogoComponent from "./logocomponent";
export default function RoomTopbar({roomId,name}:{roomId:string,name:string})
{ 
    const route = useRouter()
    return(
        <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '1rem',gap:'5rem' }}  >
            <LogoComponent/>
            <div style={{ cursor: "pointer" }} id={roomId}onClick={(e) => {
                const roomId = e.currentTarget.id
                route.push(`/roomdetail/${roomId}`)
            }}>
                <Typography variant="h6" textAlign={"center"}>{name}</Typography>
            </div>
        </div>
    )
}