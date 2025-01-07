import React, { useState } from "react";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const ForgotPassword = ({ onCancel }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h3>Forgot Password</h3>
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
            className="mt-3"
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Reset Password"}
          </Button>
          <Button
            variant="link"
            className="mt-2"
            onClick={onCancel}
          >
            Back to Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
