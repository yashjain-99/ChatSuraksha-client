import React, { useContext, useEffect, useState } from "react";
import { createRoot } from "react-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./routes/dashboard";
import Login from "./routes/login";
import Signup from "./routes/signup";
import Error from "./routes/error";
import AuthContext, { AuthProvider } from "./contexts/AuthProvider";
import validateSession from "./hooks/useValidateSession";
import Loader from "./components/loader";

const rootElement = createRoot(document.getElementById("root"));

const ProtectedRoutes = ({ children }) => {
  const [validated, setValidated] = useState(null);
  const { setAuth } = useContext(AuthContext);
  useEffect(() => {
    const validate = async () => {
      try {
        const isValidSession = await validateSession(setAuth);
        setValidated(isValidSession);
      } catch (error) {
        console.error("Error validating session:", error);
        setValidated(false);
      }
    };
    validate();
  }, []);
  if (validated === null) return <Loader />;
  if (validated) return children;
  return <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
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
      </AuthProvider>
    </BrowserRouter>
  );
};

rootElement.render(<App />);
