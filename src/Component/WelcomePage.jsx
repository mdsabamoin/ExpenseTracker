import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FaGithub } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { Context } from "../Store/ContextProvider";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setForm,setDetails } from "../Slices/AuthSice";
import Card from 'react-bootstrap/Card';

const WelcomePage = () => {
  // const ctx = useContext(Context);
  const name= useSelector((state)=>state.auth.name);
  const url = useSelector((state)=>state.auth.url);
  const idToken = localStorage.getItem("idToken");
  const [lname,setlname] = useState("");
  const [lurl,setlurl] = useState("");
  const dispatch = useDispatch();
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!lname || !lurl) {
      alert("Please fill in all the details.");
      return;
    }

    try {
      const obj = {
        idToken: idToken,
        displayName: lname,
        photoUrl: lurl
      };

      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBf6QbBbnG0QBk-3fhKn_Eag5CLYS7O5kA",
        obj
      );

      if (response.data) {
        console.log(response.data)
        alert(`Details with LocalId ${response.data.localId}updated successfully!`);
        dispatch(setDetails(obj));
        setlname("");
        setlurl("");
      }
    } catch (error) {
      console.error("Error updating details:", error);
      alert("An error occurred while updating details. Please try again.");
    }
  };

  return (<div>
    <div style={{ width: '22rem',display:"flex",justifyContent:"center",alignItems:"center",width:"100vw",height:"80vh" }}>
    <div className="welcome-container">
      <div className="header">
        <h4>Contact Details</h4>
        <Button
          variant="outline-danger"
          onClick={() => {
            dispatch(setForm(false))
          }}
        >
          Cancel
        </Button>
      </div>

      <div className="form-container">
        <Form  onSubmit={handleFormSubmit}>
          <Row>
            <Col>
              <Form.Group as={Row}  className="mb-1">
                <Form.Label column sm="5" className="text-end">
                  <FaGithub /> Full Name
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="text"
                    onChange={(e) =>setlname(e.target.value)}
                    value={lname}
                    required
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group as={Row}  className="mb-1">
                <Form.Label column sm="5" className="text-end" style={{ whiteSpace: "nowrap" }}>
                  <CiGlobe /> Profile Photo URL
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="url"
                    onChange={(e) => setlurl(e.target.value)}
                    value={lurl}
                    required
                    
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Button variant="success" type="submit">
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      
    </div>
    </div>
    </div>
  );
};

export default WelcomePage;
