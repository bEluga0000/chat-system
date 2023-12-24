import { Card, Typography,Button } from "@mui/material";
import { useState } from "react";
export default function Signin()
{
    const[showPass,setShowPass] = useState(false)
    return(
        <Card style={{ padding: '0 1rem', textAlign:"center"}}>
            <Typography variant="h3" textAlign={"center"}>
                Welcome to Bud Ping
            </Typography>
            <Typography variant="subtitle1">
                SignIn and Text with your Buds
            </Typography>
            <div  style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%',gap:'1rem',padding:'2rem 0',marginTop:'.5rem'}}>
                <input type="text" required style={{fontSize:'20px',padding:'5px' , width:'70%'}}/>
                <input type="email" required style={{ fontSize: '20px', padding: '5px', width: '70%' }}/>

                <div style={{ display: 'flex', width: '70%'}}>
                    <input type="password" required style={{ fontSize: '20px', padding: '5px',width:'80%' }} />
                    <div style={{width: '20%'}}>
                        <button style={{ width: '100%', height: '100%' }}>eye</button>
                    </div>
                    
                </div>
                <Button variant="contained" style={{width:'70%'}}>Signin</Button>
            </div>
        </Card>
    )
}