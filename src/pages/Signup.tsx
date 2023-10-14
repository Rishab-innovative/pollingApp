import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container, InputGroup, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUserRoles } from "../redux/Slice";
import { useSelector, useDispatch } from "react-redux";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { AppDispatch } from "../redux/Store";

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
  const userRole: [] = [];
  const checkLengthOfPassword = /.{8,}/;
  const upperCaseOfPassword = /[A-Z]/;
  const lowerCaseOfPassword = /[a-z]/;
  const digitOfPassword = /\d/;
  const characterInPassword = /[!@#$%^&*]/;

  const isLengthValid = checkLengthOfPassword.test(signUpFormData.password);
  const isUppercaseValid = upperCaseOfPassword.test(signUpFormData.password);
  const isLowercaseValid = lowerCaseOfPassword.test(signUpFormData.password);
  const isDigitValid = digitOfPassword.test(signUpFormData.password);
  const isSpecialCharacterValid = characterInPassword.test(
    signUpFormData.password
  );

  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state) => state);
  console.log(state, "==dtat state");
  

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpFormData({
      ...signUpFormData,
      [event.target.id]: event.target.value,
    });
  };
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSignUpFormData({
      ...signUpFormData,
      [event.target.id]: event.target.value,
    });
  };
  useEffect(() => {
    dispatch(fetchUserRoles());
  }, [dispatch]);
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
              <Form.Group>
                <Form.Control
                  required
                  size="lg"
                  type="text"
                  placeholder="Enter First name"
                  onChange={handleInput}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  required
                  id="lname"
                  size="lg"
                  type="text"
                  placeholder="Enter Last name"
                  onChange={handleInput}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  required
                  id="email"
                  size="lg"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleInput}
                />
              </Form.Group>

              <Form.Group>
                <InputGroup>
                  <Form.Control
                    required
                    id="password"
                    size="lg"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    onChange={handleInput}
                  />
                  <InputGroup.Text>
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      className="password-toggle-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Select
                size="lg"
                aria-label="Role"
                id="role"
                required
                onChange={handleSelect}
              >
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
                <p onClick={() => navigate("/")} className="login-btn">
                  <u>Log In</u>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
