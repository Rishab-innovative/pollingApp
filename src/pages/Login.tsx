import { Form, InputGroup, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { sendLoginData } from "../redux/Slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/Store";
import { BiLoader } from "react-icons/bi";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const LogInInfo = useSelector((state: any) => state);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSignUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginInputData = {
      email: loginData.email,
      password: loginData.password,
    };
    dispatch(sendLoginData(loginInputData));
  };
  return (
    <div className="main-container">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form onSubmit={handleSignUpSubmit} className="login-form">
              <div className="login-heading">
                <p>LOG IN NOW</p>
              </div>
              <Form.Group>
                <Form.Control
                  id="email"
                  type="email"
                  size="lg"
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
                {LogInInfo.isError === true ? (
                  <p className="userError">User Not Found.</p>
                ) : null}
              </Form.Group>
              {LogInInfo.isLoading === true ? (
                <button disabled={true} className="signup-btn">
                  <BiLoader />
                </button>
              ) : (
                <button type="submit" className="signup-btn">
                  Log In
                </button>
              )}

              <div className="form-footer">
                <p> Don't have an account yet ?</p>
                <p onClick={() => navigate("/signup")} className="login-btn">
                  <u>Create an account</u>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
