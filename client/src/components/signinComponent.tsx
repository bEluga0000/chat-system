import { BASE_URL } from "@/config"
import { userState } from "@/store/atom/user"
import { Typography, Button } from "@mui/material"
import axios, { AxiosError } from "axios"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSetRecoilState } from "recoil"

export default function SigninCompo()
{
    const route = useRouter()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPass, setShowPass] = useState<boolean>(false)
    const [isEmailValid, setIsEmailValid] = useState<boolean>(false)
    const setUser = useSetRecoilState(userState)
    useEffect(() => {
        setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    }, [email])
    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '1rem', padding: '2rem 0', marginTop: '.5rem' }}>
            <div style={{ width: '100%' }}>
                <input placeholder="email" type="email" required style={{ fontSize: '20px', padding: '5px', width: '70%' }} onChange={(e) => {
                    setEmail(e.target.value)
                }} />
                {!isEmailValid && <Typography textAlign={'start'} padding={'0 4rem'}>
                    *Enter the valid email</Typography>}
            </div>
            <div style={{ display: 'flex', width: '70%' }}>
                <input placeholder="password" type={showPass ? "text" : "password"} required style={{ fontSize: '20px', padding: '5px', width: '80%' }} onChange={(e) => {
                    setPassword(e.target.value)
                }} />
                <div style={{ width: '20%', border: '1px solid black' }} >
                    <Button style={{ width: '100%', height: '100%', color: 'black' }} onClick={() => {
                        setShowPass(!showPass)
                    }}>{showPass ? <Eye /> : <EyeOff />}</Button>
                </div>

            </div>
            <Button variant="contained" style={{ width: '70%' }} disabled={!isEmailValid}
            onClick={async()=>{
                try{
                    const res = await axios.post(`${BASE_URL}/user/signin`,{
                        useremail:email,
                        password
                    })
                    if(res.data && res.data.token)
                    {
                        const token = res.data.token
                        localStorage.setItem("token","bearer "+token)
                        setUser({
                            isUserLoading:false,
                            username:res.data.usename,
                            userId:res.data.userId,
                            subRooms:res.data.rooms
                        })
                        route.push(`/dashboard`)
                    }
                }
                catch(err:unknown)
                {
                    if (axios.isAxiosError(err)) {
                        const axiosError = err as AxiosError
                        if (axiosError.response) {
                            alert(`Error response: ${axiosError.response.data.message}`);
                            console.log(`Status code: ${axiosError.response.status}`);
                        }
                    }
                }
            }}>Signin</Button>
        </div>
    )
} 