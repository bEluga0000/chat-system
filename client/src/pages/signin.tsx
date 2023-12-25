import { Card, Typography,Button } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
export default function Signin()
{
    const router = useRouter()
    const[email,setEmail] = useState<string>("")
    const[password,setPassword]= useState<string>("")
    const[showPass,setShowPass] = useState<boolean>(false)
    const[isEmailValid,setIsEmailValid] = useState<boolean>(false)
    useEffect(()=>{
        setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    },[email])
    return(
        <Card style={{ padding: '1rem 1rem', textAlign:"center"}}>
            <Typography variant="h3" textAlign={"center"}>
                Welcome to Bud Ping
            </Typography>
            <Typography variant="subtitle1">
                SignIn and Text with your Buds
            </Typography>
            <div  style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%',gap:'1rem',padding:'2rem 0',marginTop:'.5rem'}}>
                <div style={{ width: '100%' }}>
                <input placeholder="email" type="email" required style={{ fontSize: '20px', padding: '5px', width: '70%' }} onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
                    {!isEmailValid && <Typography textAlign={'start'} padding={'0 4rem'}>
                    *Enter the valid email</Typography>}
                </div>
                <div style={{ display: 'flex', width: '70%'}}>
                    <input placeholder="password" type={showPass? "text":"password"} required style={{ fontSize: '20px', padding: '5px',width:'80%' }} onChange={(e)=>{
                        setPassword(e.target.value)
                    }}/>
                    <div style={{ width: '20%', border: '1px solid black' }} >
                        <Button  style={{ width: '100%', height: '100%' ,color:'black'}} onClick={()=>{
                            setShowPass(!showPass)
                        }}>{showPass ? <Eye/>:<EyeOff/>}</Button>
                    </div>
                    
                </div>
                <Button variant="contained" style={{width:'70%'}} disabled={!isEmailValid}>Signin</Button>
            </div>
            <div>
                <Typography> New to Here ? <Button style={{ textDecoration: 'underline' }} onClick={() => {
                    router.push('/signup')
                }}>Sigup</Button></Typography>
            </div>
        </Card>
    )
}