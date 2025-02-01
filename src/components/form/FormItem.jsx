const FormItem = ({ text, id, type }) => {
  return (
    <div className="flex flex-col flex-1">
      <label htmlFor={id}>{text}:</label>
      <input
        id={id}
        type={type}
        className="border border-gray-500 py-1 rounded-md"
      />
    </div>
  );
};
export default FormItem;
