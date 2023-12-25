import { useRouter } from "next/router"

export default function LogoComponent()
{
    const router = useRouter()
    return(
        <div onClick={()=>{
            router.push('/dashboard')
        }} style={{cursor:'pointer'}}>
        <img src="../images/logo.png" alt="Logo" />
        </div>
    )
}