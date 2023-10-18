import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container, InputGroup, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signUpUserData, fetchUserRoles, addData } from "../redux/SignUpSlice";
import { useSelector, useDispatch } from "react-redux";
import { BiLoader } from "react-icons/bi";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { AppDispatchType, RootState } from "../redux/Store";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const SignUp: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
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
    roleError: false,
    emailError: false,
  });
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatchType>();

  const userRole = useSelector((state: RootState) => state.signUp);
  const handleRedirectToLogin = () => {
    navigate("/");
    setInputFieldError({
      ...inputFieldError,
      emailError: false,
    });
  };
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
    setInputFieldError({
      ...inputFieldError,
      roleError: false,
    });
  };

  useEffect(() => {
    dispatch(fetchUserRoles());
  }, []);

  const handleSignUpSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!passwordRegex.test(signUpFormData.password)) {
      setInputFieldError({
        ...inputFieldError,
        passwordError: false,
      });
      return;
    } else if (signUpFormData.roleId === "") {
      setInputFieldError({
        ...inputFieldError,
        roleError: true,
      });
    }
    if (
      inputFieldError.passwordError &&
      signUpFormData.firstName.length >= 5 &&
      signUpFormData.lastName.length >= 5 &&
      !inputFieldError.roleError
    ) {
      const userData = {
        firstName: signUpFormData.firstName,
        lastName: signUpFormData.lastName,
        email: signUpFormData.email,
        password: signUpFormData.password,
        roleId: signUpFormData.roleId,
      };
      dispatch(addData(userData));
      const res = await dispatch(signUpUserData(userData));
      if (res.payload) {
        setShowModal(true);
      } else {
        setInputFieldError({
          ...inputFieldError,
          emailError: true,
        });
      }
    }
  };

  const handleSuccessSignUp = () => {
    navigate("/");
    setShowModal(false);
  };
  return (
    <div className="main-container">
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>You have successfully registered</Modal.Title>
        </Modal.Header>
        <Modal.Body>This will redirect you to Login Page.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSuccessSignUp}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
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
                {inputFieldError.emailError === true ? (
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
                required
                size="lg"
                aria-label="Role"
                id="id"
                onChange={handleSelect}
              >
                <option>Select a Role</option>
                {userRole.data.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
              {inputFieldError.roleError ? (
                <p className="passwordError">Please select a role.</p>
              ) : null}
              {userRole.isLoading === true ? (
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
                <p onClick={handleRedirectToLogin} className="login-btn">
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
