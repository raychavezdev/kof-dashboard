import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isValidToken, setIsValidToken] = useState(null);

  const saveToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsValidToken(false);
  };

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsValidToken(false);
        return;
      }

      try {
        const response = await fetch(
          "https://palevioletred-buffalo-273277.hostingersite.com/verify_token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
          logout();
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsValidToken(false);
        logout();
      }
    };

    verifyToken();
  }, [token]);

  if (isValidToken === null) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setToken={saveToken} />} />

        <Route element={<ProtectedRoute isValidToken={isValidToken} />}>
          <Route
            path="/dashboard"
            element={<Dashboard logout={logout} token={token} />}
          />
        </Route>

        <Route
          path="*"
          element={
            <Navigate to={isValidToken ? "/dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
