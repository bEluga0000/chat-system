import { BASE_URL } from "@/config";
import { userState } from "@/store/atom/user";
import { Card, Typography, Button } from "@mui/material";
import axios, { AxiosError } from "axios";
import { Eye ,EyeOff} from "lucide-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

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
    const setUser = useSetRecoilState(userState)
    useEffect(()=>{
        const isUsernameValid = !/\s/.test(username) && username.trim() !== "";
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        const isPasswordValid = password.length > 4
        setIsUsernameValid(isUsernameValid)  
        setIsEmailValid(isEmailValid) 
        setIsPasswordValid(isPasswordValid) 
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
                    try{
                        const res = await axios.post(`${BASE_URL}/user/signup`, {
                            username,
                            useremail: email,
                            password
                        })
                        if (res.data && res.data.token) {
                                const token = res.data.token
                                localStorage.setItem('token', "bearer " + token)
                            setUser({
                                isUserLoading: false,
                                username: res.data.username,
                                userId: res.data.userId,
                                subRooms: res.data.rooms
                            })
                                router.push(`/dashboard`)
                        }
                    }
                    catch (err:unknown) {
                        if(axios.isAxiosError(err))
                        {
                            const axiosError = err as AxiosError
                            if (axiosError.response) {
                                alert(`Error response: ${axiosError.response.data.message}`);
                                console.log(`Status code: ${axiosError.response.status}`);
                            }
                        }
                    }
                    
                    
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