import { userIdState } from "@/store/selector/userstates"
import { useRouter } from "next/router"
import { useRecoilValue } from "recoil"

export default function LogoComponent()
{
    const userid = useRecoilValue(userIdState)
    const router = useRouter()
    return(
        <div onClick={()=>{
            router.push(`/dashboard`)
        }} style={{cursor:'pointer'}}>
        <img src="../images/logo.png" alt="Logo" />
        </div>
    )
}