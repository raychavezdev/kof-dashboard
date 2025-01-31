import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import useFetch from "./hooks/useFetch";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isValidToken, setIsValidToken] = useState(false);
  const { request } = useFetch();

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
    console.log("isValidToken: ", isValidToken);
    console.log("token: ", token);
    const verifyToken = async () => {
      if (!token) {
        console.log("!token");
        setIsValidToken(false);
        return;
      }

      try {
        const data = await request("/verify_token", "POST", {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        });

        if (data.status == 200) {
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

  if (!isValidToken && token) return;

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
