import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Context } from "../Store/ContextProvider";
import WelcomePage from "./WelcomePage";
import ExpenseTracker from "./ExpenseTracker";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Slices/AuthSice";
import axios from "axios";
import { MdVerified } from "react-icons/md";
import { setForm ,Verified} from "../Slices/AuthSice";

const Welcome = () => {
  const dispatch = useDispatch();
  // const ctx = useContext(Context);
  // const idToken = useSelector((state)=>state.auth.idToken);
  const idToken = localStorage.getItem("idToken")
  const EmailVerified = useSelector((state)=>state.auth.EmailVerified);
  const form = useSelector((state)=>state.auth.form);
  // console.log(idToken);
  const loadFormHandler = () => {
    dispatch(setForm(true));
    localStorage.setItem("form", "true");
  };

  const logoutHandler = () => {
    dispatch(logout());
    // dispatch(Verified(false));
    localStorage.removeItem("email");
    localStorage.removeItem("idToken");
    localStorage.removeItem("form");
  };

  const sendVerificationEmail = async () => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBf6QbBbnG0QBk-3fhKn_Eag5CLYS7O5kA`,
        {
          requestType: "VERIFY_EMAIL",
          "idToken": idToken,
        }
      );
      if (response.data) {
        alert("Verification email sent. Please check your inbox.");
        
      }
    } catch (error) {
      alert(
        error.response?.data?.error?.message || "Something went wrong. Try again."
      );
    }
  };

  const renderHeader = () => {
    
      return (
        <div className="header" style={{display:"flex",justifyContent:"space-between",backgroundColor:"lightgreen"}}>
          <h4>
            {form
              ? "Winners never Quit, Quitters never Win"
              : "Welcome to Expense Tracker!!!"}
          </h4>
          <div className="profile-actions" style={{width:"28em"}}>
            <span className="profile-message" style={{fontSize:"small"}}>
              {form
                ? "Your profile is 64% complete. A complete profile has higher chances of landing a job."
                : "Your Profile is incomplete."}
            </span>
            <Button
              variant="link"
              className="complete-now-btn"
              onClick={loadFormHandler}
            >
              Complete Now
            </Button>
            <Button
              variant="info"
              className="logout-btn"
              onClick={logoutHandler}
              style={{fontSize:"small",marginLeft:"2%"}}
            >
              Log Out
            </Button>
          </div>
        </div>
      );
     
      
        
      
    
  };

  return (
    <>
      {renderHeader()}
      {/* <hr /> */}
      {form ? <WelcomePage /> : <ExpenseTracker />}
    </>
  );
};

export default Welcome;
