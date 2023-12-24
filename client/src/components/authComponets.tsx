import { Button } from "@mui/material"
export default function AuthCompo()
{
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8.5rem' }}>
            <Button variant='contained'>Signin</Button>
            <Button variant='contained'>SignUp</Button>
        </div>
    )
}