import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import PollingPage from "./pages/PollingPage";
import ProtectedRoute from "./ProtectedRoute";
import AddEditPollPage from "./pages/AddEditPollPage";
import CreateUserPage from "./pages/CreateUserPage";
import ListUserPage from "./pages/ListUserPage";
import ViewPollPage from "./pages/ViewPollPage";
import Navbar from "./components/Navbar";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
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
            <ProtectedRoute Component={AddEditPollPage} redirectTo="/addPoll" />
          }
        />
        <Route
          path="/createUser"
          element={
            <ProtectedRoute Component={CreateUserPage} redirectTo="/polling" />
          }
        />
        <Route path="/editPoll/:id" element={<AddEditPollPage />} />
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
