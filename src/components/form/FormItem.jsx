const FormItem = ({ text, id, type, value, setValue }) => {
  return (
    <div className="flex flex-col flex-1">
      <label htmlFor={id}>{text}:</label>
      <input
        id={id}
        type={type}
        className="border border-gray-500 py-1 px-2 rounded-md"
        value={value}
        onChange={(e) => setValue(e.target.value ?? "")}
      />
    </div>
  );
};
export default FormItem;
