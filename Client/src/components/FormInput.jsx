const FormInput = ({ name, type, labelText, defaultValue = "", onchange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id="name"
        name={name}
        className="form-input"
        defaultValue={defaultValue}
        onChange={onchange}
        required
      />
    </div>
  );
};
export default FormInput;
