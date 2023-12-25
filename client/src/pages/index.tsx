import AuthCompo from "@/components/authComponets"
import Instructions from "@/components/instruction"
import Logo from "@/components/logocomponent"
import { Card, Typography} from "@mui/material"
import { useRouter } from "next/router"
import styles from '../styles/allPages.module.css'

export default function Home() {
  const router = useRouter()
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
