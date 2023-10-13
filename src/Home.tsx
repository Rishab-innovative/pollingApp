import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Welcome to the Home Page</h1>
      <button onClick={() => navigate("/signup")}>SIGNUP PAGE</button>
      <button onClick={() => navigate("/login")}>LOGIN PAGE</button>
    </div>
  );
};

export default Home;
