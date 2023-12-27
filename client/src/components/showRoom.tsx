import { Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function ShowRoom({id,name,createdby}:{id:any,name:any,createdby:any})
{
    const route = useRouter()
    return(
        <div style={{padding:'1rem',cursor:'pointer'}} id={id} onClick={(e)=>{
            const roomid = e.currentTarget.id
            route.push(`/room/${roomid}`)
        }}>
            <Typography variant='h6'>
                {name}
            </Typography>
            <Typography variant="subtitle2">created By: <span style={{fontSize:'20px'}}>{createdby}</span></Typography>
            <hr />
        </div>
    )
}