import { Typography } from "@mui/material";
import LogoComponent from "./logocomponent";
export default function RoomTopbar()
{
    return(
        <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '1rem',gap:'5rem' }}>
            <LogoComponent/>
            <div style={{cursor:"pointer"}}>
                <Typography variant="h6" textAlign={"center"}>Chat Room 1</Typography>
            </div>
        </div>
    )
}