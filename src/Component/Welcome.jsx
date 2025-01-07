import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Context } from "../Store/ContextProvider";
import WelcomePage from "./WelcomePage";
import ExpenseTracker from "./ExpenseTracker";
import { useDispatch } from "react-redux";
import { logout } from "../Slices/AuthSice";
import axios from "axios";
import { MdVerified } from "react-icons/md";

const Welcome = () => {
  const dispatch = useDispatch();
  const ctx = useContext(Context);

  const loadFormHandler = () => {
    ctx.setForm(true);
    localStorage.setItem("form", "true");
  };

  const logoutHandler = () => {
    dispatch(logout());
    ctx.setEmailVerified(false);
    localStorage.removeItem("idToken");
    localStorage.removeItem("form");
  };

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
    } catch (error) {
      alert(
        error.response?.data?.error?.message || "Something went wrong. Try again."
      );
    }
  };

  const renderHeader = () => {
    if (ctx.emailVerified) {
      return (
        <div className="header" style={{display:"flex",justifyContent:"space-between"}}>
          <h4>
            {ctx.form
              ? "Winners never Quit, Quitters never Win"
              : "Welcome to Expense Tracker!!!"}
          </h4>
          <div className="profile-actions">
            <span className="profile-message">
              {ctx.form
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
            <Button variant="success" className="verified-btn">
              Verified <MdVerified />
            </Button>
            <Button
              variant="info"
              className="logout-btn"
              onClick={logoutHandler}
            >
              Log Out
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="header" style={{display:"flex",justifyContent:"space-between"}}>
          <h4>Welcome to Expense Tracker!!!</h4>
          <div className="auth-actions">
            <Button
              variant="primary"
              className="verify-email-btn"
              onClick={sendVerificationEmail}
            >
              Verify Email
            </Button>
            <Button
              variant="success"
              className="logout-btn"
              onClick={logoutHandler}
            >
              Log Out
            </Button>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {renderHeader()}
      <hr />
      {ctx.form ? <WelcomePage /> : <ExpenseTracker />}
    </>
  );
};

export default Welcome;
