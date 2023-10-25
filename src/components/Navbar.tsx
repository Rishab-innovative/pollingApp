import Navbar from "react-bootstrap/Navbar";
import { useEffect } from "react";
import { useState } from "react";
import "../css/App.css";
import Button from "react-bootstrap/Button";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Nav: React.FC = () => {
  interface data {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    role: number | null;
  }
  const navigate = useNavigate();
  const [hamburgerModal, setHamburgerModal] = useState<boolean>(false);
  const [logOutModal, setLogOutModal] = useState<boolean>(false);
  const [loginUserData, setLoginUserData] = useState<data>({
    firstName: null,
    lastName: null,
    email: null,
    role: null,
  });
  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("userData");
    setLoginUserData({
      firstName: userDataFromLocalStorage
        ? JSON.parse(userDataFromLocalStorage).firstName
        : null,
      lastName: userDataFromLocalStorage
        ? JSON.parse(userDataFromLocalStorage).lastName
        : null,
      email: userDataFromLocalStorage
        ? JSON.parse(userDataFromLocalStorage).email
        : null,
      role: userDataFromLocalStorage
        ? JSON.parse(userDataFromLocalStorage).roleId
        : null,
    });
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  console.log(loginUserData.role, "role000");
  return (
    <>
      <Navbar className="bg-body-tertiary justify-content-between positon-relative">
        <div className="multi-btn">
          {loginUserData.role === 1 ? (
            <>
              <Button variant="success" onClick={() => navigate("/polling")}>
                Polls
              </Button>
              <Button variant="success" onClick={() => navigate("/addPoll")}>
                Add Poll
              </Button>
              <Button variant="success" onClick={() => navigate("/createUser")}>
                Create User
              </Button>
              <Button variant="success" onClick={() => navigate("/listUser")}>
                List User
              </Button>
            </>
          ) : (
            <Button variant="success" onClick={() => navigate("/addPoll")}>
              Add Poll
            </Button>
          )}
        </div>
        <div className="hamburger-menu">
          <FaBars onClick={() => setHamburgerModal(!hamburgerModal)} />
          {hamburgerModal ? (
            <div className="hamburger-menu-box">
              {loginUserData.role === 1 ? (
                <>
                  <Button
                    variant="success"
                    onClick={() => navigate("/polling")}
                  >
                    Polls
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => navigate("/addPoll")}
                  >
                    Add Poll
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => navigate("/createUser")}
                  >
                    Create User
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => navigate("/listUser")}
                  >
                    List User
                  </Button>
                </>
              ) : (
                <Button variant="success" onClick={() => navigate("/polling")}>
                  Polls
                </Button>
              )}
            </div>
          ) : null}
        </div>
        <h3 className="polling-heading">POLLING APPLICATION</h3>
        <div className="profile">
          <div className="userData">
            <span>
              {loginUserData.firstName} {loginUserData.lastName}
            </span>
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
