import Navbar from "react-bootstrap/Navbar";
import { useEffect } from "react";
import { useState } from "react";
import "../css/NavBarPage.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { addId } from "../redux/PollListSlice";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { emptyPollList } from "../redux/PollListSlice";
import JsonDataNavBar from "./JsonDataNavBar.json";
import { useLocation } from "react-router-dom";

const Nav: React.FC = () => {
  interface data {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    role: number | null;
    id: number | null;
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const [hamburgerModal, setHamburgerModal] = useState<boolean>(false);
  const [logOutModal, setLogOutModal] = useState<boolean>(false);
  const [loginUserData, setLoginUserData] = useState<data>({
    firstName: null,
    lastName: null,
    email: null,
    role: null,
    id: null,
  });
  useEffect(() => {
    const userDataFromLocalStorage: string | null =
      localStorage.getItem("userData");
    const ParsedUserData = JSON.parse(userDataFromLocalStorage as string);

    if (userDataFromLocalStorage) {
      setLoginUserData({
        firstName: ParsedUserData.firstName,
        lastName: ParsedUserData.lastName,
        email: ParsedUserData.email,
        role: ParsedUserData.roleId,
        id: ParsedUserData.id,
      });
    } else {
      setLoginUserData({
        firstName: null,
        lastName: null,
        email: null,
        role: null,
        id: null,
      });
    }
  }, [pathName]);

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

  useEffect(() => {
    if (window.location.pathname === "/addPoll") {
      console.log("insideIF");
      dispatch(addId(0));
    }
  }, [window.location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(emptyPollList());
    navigate("/");
  };
  return (
    <>
      {loginUserData && loginUserData?.id ? (
        <Navbar
          className="justify-content-between positon-relative"
          bg="dark"
          data-bs-theme="dark"
        >
          <div className="multi-btn">
            {loginUserData.role === 1 ? (
              <>
                {JsonDataNavBar.map((items) => (
                  <NavLink
                    key={items.label}
                    to={items.path}
                    active-classname="active"
                  >
                    <Button>{items.label}</Button>
                  </NavLink>
                ))}
              </>
            ) : (
              <NavLink to="/polling" active-classname="active">
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
                  <Button
                    variant="success"
                    onClick={() => navigate("/polling")}
                  >
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
            <div
              className="avatar"
              onClick={() => setLogOutModal(!logOutModal)}
            >
              <img
                src="avatar.png"
                alt="avatar"
                width="44px"
                height="44px"
              ></img>
            </div>
            {logOutModal ? (
              <div className="logout-modal">
                <Button
                  className="me-2"
                  variant="danger"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : null}
          </div>
        </Navbar>
      ) : (
        <></>
      )}
    </>
  );
};
export default Nav;
