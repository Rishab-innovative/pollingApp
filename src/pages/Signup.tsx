import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container, InputGroup, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUserRoles } from "../redux/Slice";
import { useSelector, useDispatch } from "react-redux";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { AppDispatch } from "../redux/Store";
import { addData } from "../redux/Slice";
import axios from "axios";

const SignUp: React.FC = () => {
  const [signUpFormData, setSignUpFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    roleId: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>();
  const [passwordError, setPasswordError] = useState<boolean>(true);
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
  const userRole = useSelector((state: any) => state.data);
  const userSignUpInfo = useSelector((state: any) => state);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpFormData({
      ...signUpFormData,
      [event.target.id]: event.target.value,
    });
    setPasswordError(true);
  };
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSignUpFormData({
      ...signUpFormData,
      [event.target.id]: event.target.value,
    });
    console.log(signUpFormData, "__id");
  };
  useEffect(() => {
    dispatch(fetchUserRoles());
  }, []);
  const handleSignUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !checkLengthOfPassword.test(signUpFormData.password) ||
      !upperCaseOfPassword.test(signUpFormData.password) ||
      !lowerCaseOfPassword.test(signUpFormData.password) ||
      !digitOfPassword.test(signUpFormData.password) ||
      !characterInPassword.test(signUpFormData.password)
    ) {
      setPasswordError(false);
      return;
    }

    if (passwordError) {
      const userData = {
        fname: signUpFormData.fname,
        lname: signUpFormData.lname,
        email: signUpFormData.email,
        password: signUpFormData.password,
        roleId: signUpFormData.roleId,
      };
      dispatch(addData(userData));
      console.log(userData, "--usedata");
      postData(userData);
    }
  };
  async function postData(data: any) {
    try {
      const response = await axios.post(
        "https://pollapi.innotechteam.in/user/register",
        data
      );
      console.log(response, "post response***");
    } catch (error) {
      console.error("An error occurred while making the POST request:", error);
    }
  }
  return (
    <div className="main-container">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form onSubmit={handleSignUpSubmit} className="signup-form">
              <div className="signup-heading">
                <p>SignUp Form</p>
              </div>
              <Form.Group>
                <Form.Control
                  id="fname"
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
                {passwordError ? null : (
                  <p className="passwordError">
                    Password must contain 8 letters including a number, 1 Upper
                    & lower case and 1 special character.
                  </p>
                )}
              </Form.Group>
              <Form.Select
                size="lg"
                aria-label="Role"
                id="id"
                required
                onChange={handleSelect}
              >
                <option>Select a Role</option>
                {userRole.map((item: any) => (
                  <option value={item.id}>{item.name}</option>
                ))}
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
