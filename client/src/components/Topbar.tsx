import { useRouter } from "next/router"
import LogoComponent from "./logocomponent"


export default function Topbar()
{
    const router = useRouter()
    return(
        <div style={{display:'flex',justifyContent:'space-between',padding:'1rem'}}>
            <LogoComponent/>
            <div onClick={()=>{
                router.push('/useroptions')
            }} style={{textDecoration:'underline',cursor:'pointer'}}>
                Username
            </div>
        </div>
    )
}