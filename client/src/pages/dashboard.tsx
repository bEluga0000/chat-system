import ShowRoom from "@/components/showRoom";
import Topbar from "@/components/Topbar";
import { isUserLoading, subscribedRooms } from "@/store/selector/userstates";
import { Card, CircularProgress, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import style from "../styles/allPages.module.css"
export default function Dashboard() {
    const userloading = useRecoilValue(isUserLoading)
    const subRooms = useRecoilValue(subscribedRooms)
    if (userloading) {
        return <CircularProgress />
    }
    else
    {
        return (
            <Card className={style.room}>
                <div>
                    <Topbar />
                </div>
                <hr />
                <div style={{ overflowY: 'auto', minHeight: '85%' }}>
                    {subRooms !== null && subRooms.length === 0 && <Typography variant="h2">No rooms you are subscribed</Typography>}
                    {subRooms !== null && subRooms.length > 0 && 
                    subRooms.map((room)=>{
                        return(
                            <ShowRoom key={room._id} id={room._id} name={room.name} createdby={room.createdBy}/>
                            
                        )
                    })
                    }
                </div>
            </Card>
        )
    }
    
}