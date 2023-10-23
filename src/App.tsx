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
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/polling" element={<Protected Component={Polling} />} />
        <Route path="/addPoll" element={<AddPoll />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/listUser" element={<ListUser />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
