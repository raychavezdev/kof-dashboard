import FormItem from "./FormItem";

const Form = ({ action }) => {
  return (
    <div>
      <div className="my-4">
        <form className="flex flex-col md:flex-row gap-2 md:items-end justify-between">
          <FormItem text="Nombre" id="name" type="text" />
          <FormItem text="Puntos" id="points" type="number" />
          <FormItem text="Instagram" id="instagram" type="text" />

          <div>
            <button
              type="submit"
              className={`${
                action == "add" ? "bg-green-500" : "bg-blue-500"
              } text-white rounded-md px-8 py-1 cursor-pointer w-full`}
            >
              {action == "add" ? "Agregar" : "Modificar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
