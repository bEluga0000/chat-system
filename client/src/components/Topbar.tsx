import { isUserLoading, usernameState } from "@/store/selector/userstates"
import { CircularProgress } from "@mui/material"
import { useRouter } from "next/router"
import { useRecoilValue } from "recoil"
import LogoComponent from "./logocomponent"


export default function Topbar()
{
    const username = useRecoilValue(usernameState)
    const userLoading = useRecoilValue(isUserLoading)
    const router = useRouter()
    if(userLoading)
    {
        return <CircularProgress/>
    }
    else
    {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
                <LogoComponent />
                <div onClick={() => {
                    router.push('/useroptions')
                }} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                    {username}
                </div>
            </div>
        )
    }
    
}