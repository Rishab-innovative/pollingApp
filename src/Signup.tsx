import React from "react";
import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { Form, Container, InputGroup, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const SignUp: React.FC = () => {
  const [signUpFormData, setSignUpFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpFormData({
      ...signUpFormData,
      [event.target.type]: event.target.value,
    });
  };

  // const handleSignUpSubmit =(event: React.ChangeEvent<HTMLInputElement>)=>{
  //     event.preventDefault();
  // }
  return (
    <div className="main-container">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form className="signup-form">
              {/* <Form onSubmit={handleSignUpSubmit} className="signup-form"> */}
              <div className="signup-heading">
                <p>SignUp Form</p>
              </div>
              <Form.Group controlId="formBasicName">
                <Form.Control
                required
                  size="lg"
                  type="text"
                  placeholder="Enter First name"
                  onChange={handleInput}
                />
              </Form.Group>

              <Form.Group controlId="formBasicName">
                <Form.Control
                required
                  size="lg"
                  type="text"
                  placeholder="Enter Last name"
                  onChange={handleInput}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Control
                required
                  size="lg"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleInput}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <InputGroup>
                  <Form.Control
                  required
                    size="lg"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <InputGroup.Text>
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      className="password-toggle-icon"
                      onClick={togglePasswordVisibility}
                    />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Select size="lg" aria-label="Role" as="select" required>
                <option>Select a Role</option>
                <option value="Admin">ADMIN</option>
                <option value="user">USER</option>
                <option value="Hr">HR</option>
              </Form.Select>
              <button type="submit" className="signup-btn">
                Sign Up
              </button>
              <div className="form-footer">
                <p>Already a Member ?</p>
                <p onClick={() => navigate("/login")} className="login-btn"><u>Log In</u></p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
