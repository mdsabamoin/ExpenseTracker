import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useContext, useState } from 'react';
import { Context } from '../Store/ContextProvider';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { login ,setForgotPassword,setIdToken} from '../Slices/AuthSice';

const CustomLogin = () => {
    // const ctx = useContext(Context);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const enter = useSelector((state) => state.auth.enter);
       
    // Function to handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setError(""); // Reset error

        if (!email || !password || (!isLogin && !confirmPassword)) {
            setError("Please fill in all fields!");
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            let response;
            if (isLogin) {
                // Login Logic
                response = await axios.post(
                    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBf6QbBbnG0QBk-3fhKn_Eag5CLYS7O5kA`,
                    { email, password }
                );
                const { idToken } = response.data;
                console.log(response.data);
                if (idToken) {
                    dispatch(login());
                    localStorage.setItem("idToken", idToken);
                    // dispatch(setIdToken({"idToken":idToken}));
                    // ctx.setEmailVerified(false);
                }
            } else {
                // Signup Logic
                response = await axios.post(
                    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBf6QbBbnG0QBk-3fhKn_Eag5CLYS7O5kA`,
                    { email, password }
                );
                alert(`Account created for ${response.data.email}`);
            }

            // Reset form fields
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            setError(error?.response?.data?.error?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!enter && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                        width: "100vw",
                    }}
                >
                    <Card style={{ width: '18rem', backgroundColor: "orange" }}>
                        <Card.Body>
                            <h3 style={{ textAlign: "center" }}>
                                {isLogin ? "Login" : "Sign Up"}
                            </h3>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                {!isLogin && (
                                    <Form.Group className="mb-3" controlId="formPlaintextPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                )}
                                {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
                                <Button
                                    variant="success"
                                    onClick={handleFormSubmit}
                                    style={{ width: "100%" }}
                                    disabled={loading}
                                >
                                    {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
                                </Button>
                            </Form>
                            {isLogin && (
                                <Button
                                    variant="link"
                                    style={{ marginTop: "10px", fontSize: "14px" }}
                                    onClick={() => dispatch(setForgotPassword(true))}
                                >
                                    Forgot Password?
                                </Button>
                            )}
                            <h6 style={{ marginTop: "4%", display: "flex", justifyContent: "space-around" }}>
                                {isLogin ? "Don't Have an Account?" : "Have an Account?"}
                                <Button
                                    variant="primary"
                                    onClick={() => setIsLogin(!isLogin)}
                                    style={{ width: "43%" }}
                                >
                                    {isLogin ? "Sign Up" : "Login"}
                                </Button>
                            </h6>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </>
    );
};

export default CustomLogin;
