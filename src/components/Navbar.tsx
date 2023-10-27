import Navbar from "react-bootstrap/Navbar";
import { useEffect } from "react";
import { useState } from "react";
import "../css/NavBarPage.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { emptyPollList } from "../redux/PollListSlice";
import JsonDataNavBar from "./JsonDataNavBar.json";

const Nav: React.FC = () => {
  interface data {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    role: number | null;
  }
  const dispatch = useDispatch();
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
    const userDataFromLocalStorage: string | null =
      localStorage.getItem("userData");
    const ParsedUserData = JSON.parse(userDataFromLocalStorage as string);
    setLoginUserData({
      firstName: userDataFromLocalStorage ? ParsedUserData.firstName : null,
      lastName: userDataFromLocalStorage ? ParsedUserData.lastName : null,
      email: userDataFromLocalStorage ? ParsedUserData.email : null,
      role: userDataFromLocalStorage ? ParsedUserData.roleId : null,
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (logOutModal && !event.target.closest(".avatar")) {
        setLogOutModal(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [logOutModal]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(emptyPollList());
    navigate("/");
  };

  return (
    <>
      <Navbar
        className="justify-content-between positon-relative"
        bg="dark"
        data-bs-theme="dark"
      >
        <div className="multi-btn">
          {loginUserData.role === 1 ? (
            <>
              {JsonDataNavBar.map((items) => (
                <NavLink to={items.path} active-ClassName="active">
                  <Button>{items.label}</Button>
                </NavLink>
              ))}
            </>
          ) : (
            <NavLink to="/polling" active-ClassName="active">
              <Button>Polls</Button>
            </NavLink>
          )}
        </div>
        <div className="hamburger-menu">
          <FaBars onClick={() => setHamburgerModal(!hamburgerModal)} />
          {hamburgerModal ? (
            <div className="hamburger-menu-box">
              {loginUserData.role === 1 ? (
                <>
                  {JsonDataNavBar.map((items) => (
                    <Button
                      variant="success"
                      onClick={() => navigate(items.path)}
                    >
                      {items.label}
                    </Button>
                  ))}
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
