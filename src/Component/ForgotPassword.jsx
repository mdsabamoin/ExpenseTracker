import React, { useState } from "react";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import { useSelector } from "react-redux";


const ForgotPassword = ({ onCancel }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const forgotpassword = useSelector((state)=>state.auth.ForgotPassword)

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBf6QbBbnG0QBk-3fhKn_Eag5CLYS7O5kA",
        {
          requestType: "PASSWORD_RESET",
          email: email,
        }
      );
      setSuccess(true);
      setEmail("");
      setTimeout(() => onCancel(), 3000); // Redirect to login after 3 seconds
    } catch (err) {
      setError(
        err.response?.data?.error?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
     <>
   <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    margin: 0, // Reset default margins
    padding: 0,
    boxSizing: "border-box" }}>
    <div>
      <Card style={{width: '17rem', height: "22rem" ,backgroundColor:"pink" }}>
      <div >
        <h3 style={{textAlign:"center"}}>Forgot Password</h3>
        <Form onSubmit={handleForgotPassword}>
          {success && (
            <Alert variant="success" className="mt-3">
              Password reset link has been sent to your email.
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
          <Form.Group controlId="forgotPasswordEmail">
            <Form.Label style={{ margin: "0 auto", textAlign: "center", width: "100%" }}><h5>Email Address</h5></Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            
            />
          </Form.Group>
          <div style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
          <Button
            type="submit"
            variant="primary"
            className="mt-3"
            disabled={loading}
            
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Reset Password"}
          </Button>
          <br/>
          <Button
            variant="link"
            className="mt-2"
            onClick={onCancel}
          >
            Back to Login
          </Button>
          </div>
        </Form>
      </div>
      </Card>
    </div>
    </div>
    </>
  );
};

export default ForgotPassword;
