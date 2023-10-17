import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container, InputGroup, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendSignUpData, fetchUserRoles, addData } from "../redux/Slice";
import { useSelector, useDispatch } from "react-redux";
import { BiLoader } from "react-icons/bi";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { AppDispatch } from "../redux/Store";

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>();
  const [signUpFormData, setSignUpFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roleId: "",
  });
  const [inputFieldError, setInputFieldError] = useState({
    passwordError: true,
    nameError: "",
  });

  const checkLengthOfPassword = /.{8,}/;
  const upperCaseOfPassword = /[A-Z]/;
  const lowerCaseOfPassword = /[a-z]/;
  const digitOfPassword = /\d/;
  const characterInPassword = /[!@#$%^&*]/;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userRole = useSelector((state: any) => state.data);
  const signUpInfo = useSelector((state: any) => state);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSignUpFormData = {
      ...signUpFormData,
      [event.target.id]: event.target.value,
    };
    let nameError = "";
    if (updatedSignUpFormData.firstName.length < 5) {
      nameError = "firstName";
    } else if (updatedSignUpFormData.lastName.length < 5) {
      nameError = "lastName";
    }
    setInputFieldError({
      ...inputFieldError,
      nameError: nameError,
      passwordError: true,
    });
    setSignUpFormData(updatedSignUpFormData);
  };
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSignUpFormData({
      ...signUpFormData,
      roleId: event.target.value,
    });
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
      setInputFieldError({
        ...inputFieldError,
        passwordError: false,
      });
      return;
    }
    if (inputFieldError.passwordError) {
      const userData = {
        firstName: signUpFormData.firstName,
        lastName: signUpFormData.lastName,
        email: signUpFormData.email,
        password: signUpFormData.password,
        roleId: signUpFormData.roleId,
      };
      dispatch(addData(userData));
      dispatch(sendSignUpData(userData));
    }
    if (!signUpInfo.isError && !signUpInfo.isLoading) {
      navigate("/");
    }
  };
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
                  id="firstName"
                  required
                  size="lg"
                  type="text"
                  placeholder="Enter First name"
                  onChange={handleInput}
                />
                {inputFieldError.nameError === "firstName" ? (
                  <p className="passwordError">
                    First name must contain 5 letters
                  </p>
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Control
                  required
                  id="lastName"
                  size="lg"
                  type="text"
                  placeholder="Enter Last name"
                  onChange={handleInput}
                />
                {inputFieldError.nameError === "lastName" ? (
                  <p className="passwordError">
                    Last name must contain 5 letters
                  </p>
                ) : null}
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
                {signUpInfo.isError === true ? (
                  <p className="emailError">Email is already registered.</p>
                ) : null}
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
                {inputFieldError.passwordError ? null : (
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
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
              {signUpInfo.isLoading === true ? (
                <button disabled={true} className="signup-btn">
                  <BiLoader />
                </button>
              ) : (
                <button type="submit" className="signup-btn">
                  Sign Up
                </button>
              )}
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
