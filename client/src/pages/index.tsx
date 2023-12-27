import AuthCompo from "@/components/authComponets"
import Instructions from "@/components/instruction"
import Logo from "@/components/logocomponent"
import { isUserLoading, usernameState,userIdState } from "@/store/selector/userstates"
import { Card, CircularProgress, Typography} from "@mui/material"
import { useRouter } from "next/router"
import { useRecoilValue } from "recoil"
import styles from '../styles/allPages.module.css'

export default function Home() {
  const router = useRouter()
  const isloading = useRecoilValue(isUserLoading)
  const username = useRecoilValue(usernameState)

  if(isloading)
  {
    return <CircularProgress/>
  }
  if(username)
  {
    alert(username)
    router.push(`/dashboard`)
  }
  return (
    <Card className={styles.room} style={{justifyContent:"space-between"}}>
      <div >
        <div>
          <Logo/>
        </div>
        <Typography variant='h2' textAlign={'center'}>Bud Ping</Typography> 
      </div>
      <div >
        <AuthCompo/>
      </div>
      <div>
        <Typography variant="h6">
          Basic Intructions
        </Typography>
        <Instructions/>
      </div>
    </Card>
  )
}
