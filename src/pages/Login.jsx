import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { request, loading, error } = useFetch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await request("/login", "POST", { username, password });

    if (data && data.data.token) {
      setToken(data.data.token);
      navigate("/dashboard");
    } else {
      alert(error || "Error en el login");
    }
  };

  return (
    <div className="h-screen bg-gray-600 flex flex-col justify-center items-center">
      <h1 className="font-serif text-2xl text-white mb-10 text-center tracking-wider">
        Administrador de{" "}
        <span className="block text-3xl font-bold"> King of Flat</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800  p-10 rounded-xl flex flex-col items-center gap-4 w-96\"
      >
        <input
          className="placeholder:text-gray-500 bg-gray-400 rounded-md p-2 w-full"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="placeholder:text-gray-500 bg-gray-400 rounded-md p-2 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 w-full rounded-md p-2 text-white"
        >
          {loading ? "Cargando..." : "Ingresar"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
