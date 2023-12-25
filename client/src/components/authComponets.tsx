import { Button } from "@mui/material"
import { useRouter } from "next/router"
export default function AuthCompo()
{
    const router = useRouter()
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8.5rem' }}>
            <Button variant='contained' onClick={()=>{
                router.push('/signin')
            }}>Signin</Button>
            <Button variant='contained' onClick={()=>{
                router.push('/signup')
            }}>SignUp</Button>
        </div>
    )
}