import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Form from "../components/form/Form";
import Header from "../components/Header";
import { CSVLink } from "react-csv";

const Dashboard = ({ logout }) => {
  const { request, loading, error } = useFetch("/");
  const [skaters, setSkaters] = useState([]);
  const [action, setAction] = useState("add");
  const [skaterSelected, setSkaterSelected] = useState(null);

  const fetchSkaters = async () => {
    const data = await request("/");
    if (data.data) setSkaters(data.data.sort((a, b) => b.points - a.points));
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
      if (response.status == 200) {
        fetchSkaters();
      } else {
        alert("Error al eliminar a " + skater.name);
      }
    }
  };
  const handleModify = (skater) => {
    setAction("modify");
    setSkaterSelected(skater);
  };

  return (
    <>
      <Header logout={logout} />
      <div className="mx-8 my-4 md:mx-10 md:my:5">
        <Form
          action={action}
          data={skaterSelected}
          updateTable={fetchSkaters}
        />
        <table className="text-center w-full text-sm text-white">
          <thead className="text-xs  uppercase bg-black ">
            <tr>
              <th className="px-4 py-5">Patinador</th>
              <th className="px-4 py-5">Puntos</th>
              <th className="px-4 py-5">
                <CSVLink
                  headers={[
                    { label: "Patinador", key: "name" },
                    { label: "Puntos", key: "points" },
                  ]}
                  data={skaters.map(({ name, points }) => ({ name, points }))}
                  filename="kof-tabla-de-patinadores.csv"
                  className="bg-green-700 p-1 rounded-md hover:bg-green-900 inline-flex  "
                >
                  Exportar a Excel
                </CSVLink>
              </th>
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
