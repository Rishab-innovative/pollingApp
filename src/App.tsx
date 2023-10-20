import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import Polling from "./pages/Polling";
import Protected from "./Protected";
const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/polling" element={<Protected Component={Polling} />} />
           */}
          <Route path="/polling" element={<Polling />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
