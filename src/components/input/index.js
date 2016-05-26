import './styles.css';
import {PropTypes} from 'react';

export default function Input({name, label, value, children, onChange}) {
    const input = children || <input type="text" className="input__control"
        name={name} defaultValue={value}
        onBlur={(e) => onChange(e.target.name, e.target.value)} />;
    return (<label className="input">
        <div className="input__label">{label}</div>
        {input}
    </label>);
}

Input.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.node
};

Input.defaultProps = {
    onChange() {}
};
