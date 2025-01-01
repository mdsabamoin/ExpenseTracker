import React, { useContext } from "react";
import Button from 'react-bootstrap/Button';
import { Context } from "../Store/ContextProvider";
import WelcomePage from "./WelcomePage";



const Welcome =()=>{

       const ctx = useContext(Context);
        const LoadFormHandler = ()=>{
            ctx.setForm(true);
            localStorage.setItem("form","true")
        }

    return <>
    <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
        <h4>{ctx.form?"Winners never Quit,Quitters never win ":"Welcome to Expense Tracker!!!"}</h4>
        <div> 
        <h6 style={{width:ctx.form?"58%%":"45%%",float:"right",fontSize:"small"}}>
            {ctx.form?"Your profile is 64% complete.A complete profile has higher chances of landing a job":"Your Profile is incomplete  ."}
            <Button variant="info" style={{fontSize:"14px",display:"inline-block"}} onClick={LoadFormHandler}>Complete Now</Button>
            </h6>
        
        </div>
        
    </div>
    <hr/>
    {ctx.form?<WelcomePage/>:null}
    </>
}

export default Welcome;