import {PropTypes} from 'react';

export default function Checkbox({label, name, value, onChange}) {
    return (<label className="input">
        <input type="checkbox" name={name} defaultValue={value} onChange={(e) => onChange(e.target.name, e.target.checked)} />
        <div className="input__label">{label}</div>
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
