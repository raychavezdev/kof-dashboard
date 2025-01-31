import { useState } from "react";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const request = async (
    endpoint,
    method = "GET",
    body = null,
    customHeaders = {}
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...customHeaders,
        },
        body: body ? JSON.stringify(body) : null,
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(data.message || "Error en la solicitud");
      }

      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return { request, loading, error };
};

export default useFetch;
