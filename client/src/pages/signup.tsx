import { BASE_URL } from "@/config";
import { Card, Typography, Button } from "@mui/material";
import axios from "axios";
import { Eye ,EyeOff} from "lucide-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

export default function Signup() {
    const router = useRouter()
    const [showPass, setShowPass] = useState<boolean>(false)
    const [username, setUsername] = useState<string>("")
    const[password,setPassword] = useState<string>("")
    const[email,setEmail] = useState<string>("")
    const[isDisabled,setDisable] = useState<boolean>(true)
    const[ isUsernameValid ,setIsUsernameValid]= useState<boolean>(false)
    const [isEmailValid, setIsEmailValid] = useState<boolean>(false)
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false) 
    useEffect(()=>{
        setIsUsernameValid(!/\s/.test(username) && username.trim() !== "")  
        setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
        setIsPasswordValid(password.length > 4) 
        setDisable(!(isUsernameValid && isEmailValid && isPasswordValid))
    },[username,password,email])
    return (
        <Card style={{ padding: '0 1rem 1rem 1rem', textAlign: "center" }}>
            <Typography variant="h3" textAlign={"center"}>
                Welcome to Bud Ping
            </Typography>
            <Typography variant="subtitle1">
                SignUp and Connct with your Buds
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '1rem', padding: '2rem 0 1rem 0', marginTop: '.5rem' }}>
                <div style={{width:'100%'}}>
                    <input type="text" required style={{ fontSize: '20px', padding: '5px', width: '70%' }} placeholder="username" onChange={(e) => {
                        setUsername(e.target.value)

                    }} />
                    {!isUsernameValid && <Typography textAlign={'start'} padding={'0 4rem'}>* Do not use whitespace</Typography>}
                </div>
                <div style={{width:'100%'}}>
                <input type="email" required style={{ fontSize: '20px', padding: '5px', width: '70%' }} placeholder="email" onChange={(e)=>{
                    setEmail(e.target.value)
                        
                }}/>
                    {!isEmailValid && <Typography textAlign={'start'} padding={'0 4rem'}>* Enter the valid email</Typography>}
                </div>
                <div style={{ width: '100%', alignItems: 'center', display: 'flex',justifyContent:'center',flexDirection:'column'}}>
                <div style={{ display: 'flex', width: '70%' }}>
                    <input type={showPass ? "text":"password"} required style={{ fontSize: '20px', padding: '5px', width: '80%' }} placeholder="password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}/>
                    <div style={{ width: '20%' ,cursor:"pointer",border:'1px solid black'}} >
                            <Button style={{ width: '100%', height: '100%', color: 'black' }} onClick={() => {
                                setShowPass(!showPass)
                            }}>
                            {showPass ? <Eye  /> 
                        : <EyeOff /> }</Button>
                        
                    </div>
                        
                    </div>
                    {
                        !isPasswordValid && <Typography textAlign={'start'} >*Enter the password above 4 letters</Typography>
                    }
                </div>
                    
                <Button variant="contained" style={{ width: '70%' }}disabled={isDisabled}
                onClick={async()=>{
                    const res = axios.post(`${BASE_URL}`)
                }}>Signup</Button>
            </div>
            <div>
                <Typography> Already Have Account ? <Button style={{textDecoration:'underline'}} onClick={()=>{
                    router.push('/signin')
                }}>Sigin</Button></Typography>
            </div>
        </Card>
    )
}