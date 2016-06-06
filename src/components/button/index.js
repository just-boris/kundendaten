import './styles.css';
import {node, string, func} from 'react/lib/ReactPropTypes';
import bem from 'bem-cn';

const b = bem('button');

export default function Button({children, type, skin, size, className, onClick}) {
    return <button type={type} className={b({skin, size}).mix(className)} onClick={onClick}>{children}</button>;
}

Button.defaultProps = {
    onClick() {},
    type: 'button',
    className: ''
};

Button.propTypes = {
    onClick: func,
    children: node,
    className: string,
    size: string,
    skin: string,
    type: string
};
