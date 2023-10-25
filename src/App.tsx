import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import Polling from "./pages/Polling";
import Protected from "./Protected";
import AddPoll from "./pages/AddPoll";
import CreateUser from "./pages/CreateUser";
import ListUser from "./pages/ListUser";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Protected Component={Login} redirectTo="/polling" />}
        />
        <Route
          path="/signup"
          element={<Protected Component={SignUp} redirectTo="/polling" />}
        />
        <Route
          path="/polling"
          element={<Protected Component={Polling} redirectTo="/polling" />}
        />
        <Route
          path="/addPoll"
          element={<Protected Component={AddPoll} redirectTo="/addPoll" />}
        />
        <Route
          path="/createUser"
          element={
            <Protected Component={CreateUser} redirectTo="/createUser" />
          }
        />
        <Route
          path="/listUser"
          element={<Protected Component={ListUser} redirectTo="/listUser" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
