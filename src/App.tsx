import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import PollingPage from "./pages/PollingPage";
import ProtectedRoute from "./ProtectedRoute";
import AddPollPage from "./pages/AddPollPage";
import CreateUserPage from "./pages/CreateUserPage";
import ListUserPage from "./pages/ListUserPage";
import ViewPollPage from "./pages/ViewPollPage";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const [dataFromLocalStorage, setDataFromLocalStorage] = useState<any>();
  const polls = useSelector((state: any) => state.pollList);
  useEffect(() => {
    const tempData: string | null = localStorage.getItem("userData");
    const parsedData = JSON.parse(tempData as string);
    setDataFromLocalStorage(parsedData);
  }, [polls]);
  return (
    <BrowserRouter>
      {polls?.size ? <Navbar /> : <></>}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute Component={LoginPage} redirectTo="/polling" />
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute Component={SignUpPage} redirectTo="/signup" />
          }
        />
        <Route
          path="/polling"
          element={
            <ProtectedRoute Component={PollingPage} redirectTo="/polling" />
          }
        />
        <Route
          path="/addPoll"
          element={
            <ProtectedRoute Component={AddPollPage} redirectTo="/addPoll" />
          }
        />
        <Route
          path="/createUser"
          element={
            <ProtectedRoute
              Component={CreateUserPage}
              redirectTo="/createUser"
            />
          }
        />
        <Route
          path="/viewPoll"
          element={
            <ProtectedRoute Component={ViewPollPage} redirectTo="/viewPoll" />
          }
        />
        <Route
          path="/listUser"
          element={
            <ProtectedRoute Component={ListUserPage} redirectTo="/listUser" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
