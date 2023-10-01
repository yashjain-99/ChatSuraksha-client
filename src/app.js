import React from "react";
import { createRoot } from "react-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./routes/dashboard";
import Login from "./routes/login";
import Signup from "./routes/signup";
import Error from "./routes/error";
import jwt_decode from "jwt-decode";

const rootElement = createRoot(document.getElementById("root"));

const ProtectedRoutes = ({ children }) => {
  // Check if the user is logged in by checking if the token is present in local storage
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  //verify the token
  try {
    var decoded = jwt_decode(token);
    const { exp } = decoded;
    if (Date.now() >= exp * 1000) {
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

rootElement.render(<App />);
