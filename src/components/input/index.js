import './styles.css';
import {PropTypes} from 'react';

export default function Input({name, label, value, onChange}) {
  return (<label className="input">
    <div className="input__label">{label}</div>
    <input type="text" className="input__control" name={name} defaultValue={value}
        onBlur={(e) => onChange(e.target.name, e.target.value)} />
  </label>);
}

Input.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

Input.defaultProps = {
    onChange() {}
};
