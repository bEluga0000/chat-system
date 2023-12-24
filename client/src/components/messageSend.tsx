import { Button } from "@mui/material";

export default function MessageSend()
{
    return(
        <div style={{width:'100%',height:'100%',display:"flex",padding:'0px 5px 5px 5px',gap:'5%'}}>
            <input type="text" style={{fontSize:'16px',paddingLeft:'5px',width:'75%',outline:'none',borderRadius:'10px'}}/>
            <Button variant="contained" style={{ width: '20%',  borderRadius: '10px'}}>Send</Button>
        </div>
    )
}