import { useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedProps {
  Component: React.FC;
}

const Protected: React.FC<ProtectedProps> = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("userToken");
    if (login) {
      navigate("/polling");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <Component />;
};

export default Protected;
