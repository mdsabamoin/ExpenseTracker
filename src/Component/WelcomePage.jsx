import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FaGithub } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { Context } from "../Store/ContextProvider";
import axios from "axios";

const WelcomePage = () => {
  const ctx = useContext(Context);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!ctx.name || !ctx.url) {
      alert("Please fill in all the details.");
      return;
    }

    try {
      const obj = {
        idToken: ctx.idToken,
        displayName: ctx.name,
        photoUrl: ctx.url,
      };

      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBf6QbBbnG0QBk-3fhKn_Eag5CLYS7O5kA",
        obj
      );

      if (response.data) {
        alert("Details updated successfully!");
        ctx.setDetails(obj);
      }
    } catch (error) {
      console.error("Error updating details:", error);
      alert("An error occurred while updating details. Please try again.");
    }
  };

  return (
    <div className="welcome-container">
      <div className="header">
        <h4>Contact Details</h4>
        <Button
          variant="outline-danger"
          onClick={() => {
            ctx.setForm(false);
          }}
        >
          Cancel
        </Button>
      </div>

      <div className="form-container">
        <Form>
          <Row>
            <Col>
              <Form.Group as={Row}>
                <Form.Label column sm="6">
                  <FaGithub /> Full Name
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      ctx.setName(e.target.value);
                    }}
                    value={ctx.name}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group as={Row}>
                <Form.Label column sm="6">
                  <CiGlobe /> Profile Photo URL
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="url"
                    onChange={(e) => {
                      ctx.setUrl(e.target.value);
                    }}
                    value={ctx.url}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Button variant="success" onClick={handleFormSubmit}>
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      <hr />
    </div>
  );
};

export default WelcomePage;
