import Navbar from "react-bootstrap/Navbar";
import { useEffect } from "react";
import { useState } from "react";
import "../css/App.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Nav: React.FC = () => {
  interface data {
    firstName: string | null;
    email: string | null;
  }

  const navigate = useNavigate();
  const [logOutModal, setLogOutModal] = useState<boolean>(false);
  const [loginUserData, setLoginUserData] = useState<data>({
    firstName: null,
    email: null,
  });

  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("userData");
    console.log(userDataFromLocalStorage, "beforeaprsing");
    setLoginUserData({
      firstName: userDataFromLocalStorage
        ? JSON.parse(userDataFromLocalStorage).firstName
        : null,
      email: userDataFromLocalStorage
        ? JSON.parse(userDataFromLocalStorage).email
        : null,
    });
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <Navbar className="bg-body-tertiary justify-content-between positon-relative">
        <div className="multi-btn">
          <Button variant="success" onClick={() => navigate("/addPoll")}>
            Add Poll
          </Button>
          <Button variant="success" onClick={() => navigate("/polling")}>
            Polls
          </Button>
          <Button variant="success" onClick={() => navigate("/createUser")}>
            Create User
          </Button>
          <Button variant="success" onClick={() => navigate("/listUser")}>
            List User
          </Button>
        </div>
        <h2>POLLING APPLICATION</h2>
        <div className="profile">
          <div className="userData">
            <span>{loginUserData.firstName}</span>
            <span>{loginUserData.email}</span>
          </div>
          <div className="avatar" onClick={() => setLogOutModal(!logOutModal)}>
            <img src="avatar.png" alt="avatar" width="44px" height="44px"></img>
          </div>
          {logOutModal ? (
            <div className="logout-modal">
              <Button className="me-2" variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : null}
        </div>
      </Navbar>
    </>
  );
};
export default Nav;
