import ShowRoom from "@/components/showRoom";
import Topbar from "@/components/Topbar";
import { Card } from "@mui/material";
import style from "../../styles/allPages.module.css"
export default function Dashboard() {
    return (
        <Card className={style.room}>
            <div>
                <Topbar />
            </div>
            <hr />
            <div style={{ overflowY: 'auto',minHeight:'85%'}}>
                <ShowRoom/>
                <hr />
                <ShowRoom/>
                <hr />
                <ShowRoom/>
                <hr />
                <ShowRoom />
                <hr />
                <ShowRoom />
                <hr />
                <ShowRoom />
                <hr />
                <ShowRoom />
                <hr />
                <ShowRoom />
                <hr />
            </div>
        </Card>
    )
}