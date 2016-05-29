import './styles.css';
import {PropTypes} from 'react';
import bem from 'bem-cn';

const b = bem('input');

export default function Input({name, label, value, disabled, children, onChange}) {
    const input = children || <input type="text" className={b('control', {disabled})}
        name={name} defaultValue={value} disabled={disabled}
        onBlur={(e) => onChange(e.target.name, e.target.value)} />;
    return (<label className="input">
        <div className={b('label')}>{label}</div>
        {input}
    </label>);
}

Input.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.node
};

Input.defaultProps = {
    onChange() {}
};
