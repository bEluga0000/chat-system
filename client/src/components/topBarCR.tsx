import { Typography } from "@mui/material";
import LogoComponent from "./logocomponent";

export default function CreateRoomTopBar()
{
    return(
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' ,flexDirection:'column',gap:'1rem',alignItems:"center"}}>
            <LogoComponent/>
            <div>
                <Typography variant="subtitle2" textAlign={"center"}>"Connect and chat with your buds by effortlessly creating rooms for group conversations."</Typography>
            </div>
        </div>
    )
}