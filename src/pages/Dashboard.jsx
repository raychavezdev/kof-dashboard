import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Form from "../components/form/Form";
import Header from "../components/Header";

const Dashboard = ({ logout }) => {
  const { request, loading, error } = useFetch("/");

  const [skaters, setSkaters] = useState([]);
  const [action, setAction] = useState("add");

  const fetchSkaters = async () => {
    const data = await request("/");
    if (data.data) setSkaters(data.data);
  };
  useEffect(() => {
    fetchSkaters();
  }, []);

  if (loading) return <p>Cargando tabla de patinadores...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!skaters) {
    return <p>No se encontraron patinadores</p>;
  }

  const handleDelete = async (skater) => {
    if (
      confirm(
        "¿Estas seguro que deseas eliminar a " +
          skater.name.charAt(0).toUpperCase() +
          skater.name.slice(1) +
          "?"
      )
    ) {
      const response = await request("/" + skater.id, "DELETE");
      console.log(response);
      if (response.status == 200) {
        fetchSkaters();
        alert(skater.name + " se elimino con exito");
      } else {
        alert("Error al eliminar a " + skater.name);
      }
    }
  };
  const handleModify = (skater) => {
    setAction("modify");
  };

  return (
    <>
      <Header logout={logout} />
      <div className="mx-8 my-4 md:mx-10 md:my:5">
        <Form action={action} />
        <table className="text-center w-full text-sm text-white">
          <thead className="text-xs  uppercase bg-black ">
            <tr>
              <th className="px-4 py-3">Patinador</th>
              <th className="px-4 py-3">Puntos</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {skaters.map((skater) => (
              <tr
                key={skater.id}
                className="bg-gray-600 border-b border-gray-500"
              >
                <td className="py-4 capitalize">{skater.name}</td>
                <td className="py-4">{skater.points}</td>

                <td className="text-center">
                  <button
                    className="p-1 bg-blue-500 rounded-md mr-2 cursor-pointer"
                    onClick={() => handleModify(skater)}
                  >
                    Modificar
                  </button>
                  <button
                    className="p-1 bg-red-500 rounded-md cursor-pointer"
                    onClick={() => handleDelete(skater)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
