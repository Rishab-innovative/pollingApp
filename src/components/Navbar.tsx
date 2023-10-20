import Navbar from "react-bootstrap/Navbar";
import { useEffect } from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import "../css/App.css";
// import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

const Nav: React.FC = () => {
  interface data {
    userName: string | null;
    userEmail: string | null;
  }
  const navigate = useNavigate();
  const [logOutModal, setLogOutModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<data>({
    userName: null,
    userEmail: null,
  });

  useEffect(() => {
    setUserData({
      userName: localStorage.getItem("userName"),
      userEmail: localStorage.getItem("userEmail"),
    });
  }, []);
  return (
    <Navbar className="bg-body-tertiary justify-content-between">
      <div className="multi-btn">
        <Button variant="success">Add Poll</Button>
        <Button variant="success">Create User</Button>
        <Button variant="success">List User</Button>
      </div>
      <h2>POLLING APPLICATION</h2>
      <Card className="logInCard" onClick={() => setLogOutModal(!logOutModal)}>
        <img
          src="avatar.png"
          alt="avatar"
          width="44px"
          height="44px"
        ></img>
        <Card.Body>
          <Card.Title>{userData.userName}</Card.Title>
          <Card.Text>{userData.userEmail}</Card.Text>
        </Card.Body>
        {logOutModal ? (
          <Button
            className="me-2"
            variant="danger"
            onClick={() => navigate("/")}
          >
            Logout
          </Button>
        ) : null}
      </Card>
    </Navbar>
  );
};
export default Nav;
