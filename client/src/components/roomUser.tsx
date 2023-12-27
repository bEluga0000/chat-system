import { Typography } from "@mui/material";

export default function RoomUser({user}:{username:string})
{
    return(
        <div style={{width:'100%',padding:'.4rem 1rem',display:'flex' ,alignItems:'center',justifyContent:'space-between'}}>
            <Typography variant="h6" display={"inline"}>
                {user}
            </Typography>
            {/* <Typography display={"inline"}>
                Joined On
            </Typography> */}
            
        </div>
    )
}