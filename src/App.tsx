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
          element={<ProtectedRoute Component={LoginPage} redirectTo="/" />}
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
            <ProtectedRoute
              Component={CreateUserPage}
              redirectTo="/createUser"
            />
          }
        />
        <Route
          path="/editPoll/:id"
          element={
            <ProtectedRoute
              Component={AddEditPollPage}
              redirectTo="/editPoll"
              isAdmin={true}
            />
          }
        />
        <Route path="/viewPoll/:id" element={<ViewPollPage />} />

        <Route
          path="/listUser"
          element={
            <ProtectedRoute Component={ListUserPage} redirectTo="/listUser" />
          }
        />
        <Route path="/*" element={<DefaultComponent />} />
      </Routes>
    </BrowserRouter>
  );
};
const DefaultComponent = () => {
  return (
    <div>
      <h1>Wrong routed page Found</h1>
    </div>
  );
};
export default App;
