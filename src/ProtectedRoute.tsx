import { useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedProps {
  Component: React.FC;
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedProps> = ({
  Component,
  redirectTo,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("userToken");
    if (login) {
      redirectTo === "/signup" ? navigate("/polling") : navigate(redirectTo);
    } else if (!login && redirectTo === "/signup") {
      navigate(redirectTo);
    } else {
      navigate("/");
    }
  }, [navigate, redirectTo]);

  return <Component />;
};

export default ProtectedRoute;
