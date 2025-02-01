import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import FormItem from "./FormItem";
import { useNavigate } from "react-router-dom";

const Form = ({ action, data, updateTable }) => {
  const { request } = useFetch();
  const [name, setName] = useState("");
  const [points, setPoints] = useState("");
  const [instagram, setInstagram] = useState("");
  const navigation = useNavigate();

  // Usamos un `useEffect` para actualizar los campos solo cuando se reciben datos
  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setPoints(data.points || "");
      setInstagram(data.instagram || "");
    }
  }, [data]); // Este efecto depende de `data`

  const handleAdd = async (e) => {
    e.preventDefault();
    const response = await request("/", "POST", { name, points, instagram });

    if (response && response.status === 201) {
      // Limpiar los campos después de agregar
      setName("");
      setPoints("");
      setInstagram("");
      updateTable(); // Actualizar la tabla
    } else {
      alert("Error al agregar skater");
    }
    navigation("/");
  };

  const handleModify = async (e) => {
    e.preventDefault();

    const response = await request("/" + data.id, "PUT", {
      name,
      points,
      instagram,
    });
    if (response && response.status === 200) {
      // Limpiar los campos después de modificar
      setName("");
      setPoints("");
      setInstagram("");
      updateTable();
    } else {
      alert("Error al modificar skater");
    }
    navigation("/");
  };

  return (
    <div>
      <div className="my-4">
        <form className="flex flex-col md:flex-row gap-2 md:items-end justify-between">
          <FormItem
            text="Nombre"
            id="name"
            type="text"
            value={name}
            setValue={setName}
          />
          <FormItem
            text="Puntos"
            id="points"
            type="number"
            value={points}
            setValue={setPoints}
          />
          <FormItem
            text="Instagram"
            id="instagram"
            type="text"
            value={instagram}
            setValue={setInstagram}
          />

          <div>
            <button
              type="submit"
              className={`${
                action === "add" ? "bg-green-500" : "bg-blue-500"
              } text-white rounded-md px-8 py-1 cursor-pointer w-full`}
              onClick={action === "add" ? handleAdd : handleModify}
            >
              {action === "add" ? "Agregar" : "Modificar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
