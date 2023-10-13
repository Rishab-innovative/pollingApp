import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="Home-container">
      <h1>Welcome to the Home Page</h1>
      <button className="navigate-btn" onClick={() => navigate("/signup")}>SIGNUP PAGE</button>
      <button className="navigate-btn" onClick={() => navigate("/login")}>LOGIN PAGE</button>
    </div>
  );
};

export default Home;
