import './styles.css';

export default function Input({name, label, value, onChange, readOnly}) {
  return (<label className="input">
    <div className="input__label">{label}</div>
    <input type="text" className="input__control" name={name} defaultValue={value}
        onBlur={(e) => onChange(e.target.name, e.target.value)} />
  </label>);
}

Input.defaultProps = {
    onChange() {}
};
