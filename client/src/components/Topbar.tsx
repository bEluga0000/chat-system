export default function Topbar()
{
    return(
        <div style={{display:'flex',justifyContent:'space-between',padding:'1rem'}}>
            <div>
                <img src="./public/logo.png" alt="logo" /> 
            </div>
            <div>
                Username
            </div>
        </div>
    )
}