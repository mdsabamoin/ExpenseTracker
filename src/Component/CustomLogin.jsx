import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { Context } from '../Store/ContextProvider';
import axios from "axios"
const CustomLogin = () => {

    const ctx = useContext(Context);

    const HandleFormSubmit = async (event)=>{
        event.preventDefault();

        try{

            if(ctx.isLogin){
                if(ctx.email && ctx.password){
                    const obj={
                        "email":ctx.email,
                        "password":ctx.password
                    }
                 const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBf6QbBbnG0QBk-3fhKn_Eag5CLYS7O5kA`,obj);
                 const data = response.data;
                 if(data.idToken){
                    const objForToken = {"idToken":data.idToken}
                    localStorage.setItem("idToken",objForToken.idToken);
                    ctx.setEnter(true);
                    ctx.setIdToken(data.idToken);
                 }
                 
                 
                 ctx.setEmail("");
                 ctx.setPassword("");
                 ctx.setConfirmPassword("");
                //  console.log(data);
    
                }else{
                    alert("FILL ALL THE DETAILS")
                }
            }
            if(!ctx.isLogin){
                if(ctx.email && ctx.password && ctx.confirmpassword){
                    if(ctx.confirmpassword === ctx.password){
                        const obj={
                            "email":ctx.email,
                            "password":ctx.password
                        }
                        const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBf6QbBbnG0QBk-3fhKn_Eag5CLYS7O5kA`,obj)
                        const data = response.data;
                        alert(`Your Account with Email id ${data.email} created`)
                        ctx.setEmail("");
                        ctx.setPassword("");
                        ctx.setConfirmPassword("");
                    }
                    
                }else{
                    alert("FILL ALL THE DETAILS")
                }
            }

        }catch(error){
            if(ctx.isLogin){
                alert(error);
                console.log(error?.response?.data?.error?.message);
            }else{
                alert(error?.response?.data?.error?.message);
            }
           
        }
       
    }


    return <>
       {!ctx.enter && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw" }}>
            <Card style={{ width: '18rem', backgroundColor: "orange" }}>
                <Card.Body>

                    <h3 style={{ textAlign: "center" }}>{ctx.isLogin?"Login":"Sign Up"}</h3>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" onChange={e=>ctx.setEmail(e.target.value)} value={ctx.email}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={e=>ctx.setPassword(e.target.value)} value={ctx.password}/>

                        </Form.Group>
                        {!ctx.isLogin && <Form.Group className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label>
                                Confirm Password
                            </Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" onChange={e=>ctx.setConfirmPassword(e.target.value)} value={ctx.confirmpassword}/>
                        </Form.Group>}
                        <Button variant="success" onClick={HandleFormSubmit} style={{ width: "100%" }}>{ctx.isLogin ? "Login" : "Sign Up"}</Button>
                    </Form>
                    <h6 style={{ marginTop: "4%", display: "flex", justifyContent: "space-around" }}>{ctx.isLogin ? "Don't Have an Account?" : "Have an Account?"}<Button variant="primary" onClick={() => ctx.setIsLogin(!ctx.isLogin)} style={{ width: "43%" }}>{ctx.isLogin ? "Sign Up" : "Login"}</Button></h6>
                </Card.Body>
            </Card>
        </div>}
    </>
}

export default CustomLogin;