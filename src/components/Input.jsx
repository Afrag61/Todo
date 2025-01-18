const Input = ({ id, name, labelText }) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{labelText}</label>
      <input type="text" name={name} />
    </div>
  );
};

export default Input;
