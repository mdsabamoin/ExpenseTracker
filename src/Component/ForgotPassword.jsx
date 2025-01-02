import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";

const ForgotPassword = ({ onCancel })=>{

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBf6QbBbnG0QBk-3fhKn_Eag5CLYS7O5kA",
        {
          requestType: "PASSWORD_RESET",
          "email":email
        }
      );
      alert("Password reset link has been sent to your email.");
      setEmail("");
      onCancel(); // Go back to login
    } catch (error) {
      alert(
        error.response?.data?.error?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };


   return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div style={{ width: "300px", textAlign: "center" }}>
            <h3>Forgot Password</h3>
            <Form onSubmit={handleForgotPassword}>
              <Form.Group controlId="forgotPasswordEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                type="submit"
                variant="primary"
                style={{ width: "100%", marginTop: "10px" }}
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Reset Password"}
              </Button>
              <Button
                variant="link"
                style={{ marginTop: "10px" }}
                onClick={onCancel}
              >
                Back to Login
              </Button>
            </Form>
          </div>
        </div>
      );
}

export default ForgotPassword;