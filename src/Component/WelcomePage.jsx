import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FaGithub } from "react-icons/fa";
import { CiGlobe, CiText } from "react-icons/ci";
import { useContext } from 'react';
import { Context } from '../Store/ContextProvider';
import axios from 'axios';


const WelcomePage = () => {

    const ctx = useContext(Context);

    const HandleFormSubmit = async(e)=>{
        e.preventDefault();
     try{
        const obj={
            "idToken":ctx.idToken,
            "name":ctx.name,
            "url":ctx.url
        }
        const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBf6QbBbnG0QBk-3fhKn_Eag5CLYS7O5kA",obj)
        if(response.data){
            alert("UPDATED")
            ctx.setDetails(obj);
        }
     } catch(error){
        
        alert(error);

     }
        
        

    }

    return <>
    <div  style={{marginLeft:"30%",marginRight:"4%"}}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span><h4>Contact Details</h4></span>
            <Button variant="outline-danger">Cancel</Button>
        </div>

        <div  style={{marginTop:"2%"}}>
        <Form>
            <Row>
                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm="6">
                        <FaGithub /> Full Name
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="text" onChange={e=>ctx.setName(e.target.value)}/>
                        </Col>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group as={Row}>
                        <Form.Label  column sm="6">
                        <CiGlobe /> Profile Photo URL
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="url" onChange={e=>ctx.setUrl(e.target.value)}/>
                        </Col>
                    </Form.Group>
                </Col>

            </Row>
            <Row>
                <Col>
                <Button variant="success" onClick={HandleFormSubmit}>Update</Button>
                </Col>
            </Row>
        </Form>    
        </div>
        <br/>
        
        <hr/>
        </div>
       
       
    </>
}

export default WelcomePage;