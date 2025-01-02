import React, { useContext } from "react";
import Button from 'react-bootstrap/Button';
import { Context } from "../Store/ContextProvider";
import WelcomePage from "./WelcomePage";
import axios from "axios";
import { MdVerified } from "react-icons/md";
import ExpenseTracker from "./ExpenseTracker";



const Welcome = () => {

    const ctx = useContext(Context);
    const LoadFormHandler = () => {
        ctx.setForm(true);
        localStorage.setItem("form", "true")
    }

    const LogoutHandler = ()=>{
        ctx.setEnter(false);
        ctx.setEmailVerified(false);
        ctx.setEmail("");
        ctx.setPassword("");
        localStorage.removeItem("idToken");
        localStorage.removeItem("form");
        
    }
    const sendVerificationEmail = async () => {
        try {
            const response = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBf6QbBbnG0QBk-3fhKn_Eag5CLYS7O5kA`,
                {
                    requestType: "VERIFY_EMAIL",
                    idToken: ctx.idToken,
                }
            );
            if (response.data) {
                alert("Verification email sent. Please check your inbox.");
    
            }
        
            // if(user){
            //     alert(`Your email ${response.data.email} is verified`);
            //     ctx.emailVerified(true);
            // }
        } catch (error) {
            alert(
                error.response?.data?.error?.message || "Something went wrong. Try again."
            );
        }
    };

    return <>
        {ctx.emailVerified ? <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <h4>{ctx.form ? "Winners never Quit,Quitters never win " : "Welcome to Expense Tracker!!!"}</h4>
            <div>
                <h6 style={{ width: ctx.form ? "58%%" : "45%%", float: "right", fontSize: "small" }}>
                    {ctx.form ? "Your profile is 64% complete.A complete profile has higher chances of landing a job" : "Your Profile is incomplete  ."}
                    <Button variant="link" style={{ fontSize: "14px", display: "inline-block" }} onClick={LoadFormHandler}>Complete Now</Button>
                    
                    <button>Verified <MdVerified /></button>
                    <Button variant="info" style={{ fontSize: "14px", display: "inline-block" }} onClick={LogoutHandler}>LogOut</Button>

                </h6>

            </div>

        </div> : <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <h4>Welcome to Expense Tracker!!!</h4>
            <div style={{ display: "flex", justifyContent: "space-between", width: "17%" }}>
                
                <button onClick={sendVerificationEmail}>Verify Email</button>
                <Button variant="success" style={{ fontSize: "100%", display: "inline-block" }} onClick={LogoutHandler}>LogOut</Button>
            
            </div>
        </div>
        }
        <hr />
        {ctx.form ? <WelcomePage /> : <ExpenseTracker/>}
    </>
}

export default Welcome;