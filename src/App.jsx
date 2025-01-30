import { useState, useEffect } from "react";

import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isValidToken, setIsValidToken] = useState(null); // Para gestionar la validez del token

  const saveToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsValidToken(false); // Limpia el estado de validez
  };

  // Verifica el token en el backend al cargar la aplicación
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
          setIsValidToken(true); // Token válido
        } else {
          setIsValidToken(false); // Token inválido
          logout(); // Limpia el token del localStorage si no es válido
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsValidToken(false); // Asume que el token es inválido si ocurre un error
        logout();
      }
    };

    verifyToken();
  }, [token]);

  if (isValidToken === null) {
    return <div>Loading...</div>;
  }

  if (!token || !isValidToken) {
    return <Login setToken={saveToken} />;
  }

  return <Dashboard logout={logout} token={token} />;
};

export default App;
