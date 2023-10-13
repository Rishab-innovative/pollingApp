import { Form, InputGroup, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  return (
    <div className="main-container">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form className="login-form">
              <div className="login-heading">
                <p>LOG IN NOW</p>
              </div>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  size="lg"
                  placeholder="Enter your email"
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

              <button type="submit" className="signup-btn">
                Log In
              </button>
              <div className="form-footer">
                <p> Don't have an account yet ?</p>
                <p onClick={() => navigate("/signup")} className="login-btn"><u>Create an account</u></p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
