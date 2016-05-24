export default function Input({name, label, value, onChange, readOnly}) {
  return (<label>
    {label}
    <input type="text" name={name} defaultValue={value} onBlur={(e) => onChange(e.target.name, e.target.value)} />
  </label>);
}

Input.defaultProps = {
    onChange() {}
};
