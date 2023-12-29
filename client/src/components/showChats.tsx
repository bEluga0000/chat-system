import { Typography } from "@mui/material"
export default function ShowChats({message,uname}:{message:string,uname:string})
{
    return(
        <div >
            <Typography variant="subtitle2" >- <span style={{ textDecoration: 'underline' }}>{uname}</span></Typography>
            <Typography variant="subtitle1">{message}</Typography>
        </div>
    )
}