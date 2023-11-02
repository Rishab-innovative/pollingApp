import { useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedProps {
  Component: React.FC;
  redirectTo?: string;
  isAdmin?: Boolean;
}

const ProtectedRoute: React.FC<ProtectedProps> = ({
  Component,
  redirectTo,
  isAdmin,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken: string | null = localStorage.getItem("userToken");
    const login = JSON.parse(accessToken as string);

    const accessData: string | null = localStorage.getItem("userData");
    const role = JSON.parse(accessData as string);

    if (login) {
      if (role.roleId !== 1 && isAdmin) {
        if (redirectTo === "/viewPoll") {
          navigate("/viewPoll");
        } else {
          navigate("/polling");
        }
      } else {
        if (redirectTo === "/signup" || redirectTo === "/") {
          navigate("/polling");
        }
      }
    } else {
      navigate(redirectTo === "/signup" ? "/signup" : "/");
    }
  }, [navigate, redirectTo]);

  return <Component />;
};

export default ProtectedRoute;
