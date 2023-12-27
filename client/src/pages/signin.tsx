import SigninCompo from "@/components/signinComponent";
import { usernameState } from "@/store/selector/userstates";
import { Card, Typography,Button } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
export default function Signin()
{
    const username = useRecoilValue(usernameState)
    const router = useRouter()
    if(username)
    {
        router.push('/dashboard')
    }
    return(
        <Card style={{ padding: '1rem 1rem', textAlign:"center"}}>
            <Typography variant="h3" textAlign={"center"}>
                Welcome to Bud Ping
            </Typography>
            <Typography variant="subtitle1">
                SignIn and Text with your Buds
            </Typography>
            <SigninCompo/>
            <div>
                <Typography> New to Here ? <Button style={{ textDecoration: 'underline' }} onClick={() => {
                    router.push('/signup')
                }}>Sigup</Button></Typography>
            </div>
        </Card>
    )
}