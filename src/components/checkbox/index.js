import './styles.css';
import {PropTypes} from 'react';

export default function Checkbox({label, name, value, onChange}) {
    return (<label className="checkbox">
        <input type="checkbox" className="checkbox__control"
            name={name} defaultValue={value} onChange={(e) => onChange(e.target.name, e.target.checked)} />
        <span className="checkbox__label">{label}</span>
    </label>);
}

Checkbox.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

Checkbox.defaultProps = {
    onChange() {}
};
