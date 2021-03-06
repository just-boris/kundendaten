import Input from '../input';
import {PropTypes} from 'react';
import isNumber from 'lodash/isNumber';

function formatNumber(number) {
    return isNumber(number) ? number.toString().replace('.', ',') : number;
}

function parseNumber(numberString) {
    const number = parseFloat(numberString
        .replace('.', '')
        .replace(',', '.')
    );
    return isNaN(number) ? 0 : number;
}

export default function NumericInput(props) {
    const onChange = props.onChange;
    props = Object.assign({}, props, {
        value: formatNumber(props.value),
        onChange(name, value) {
            onChange(name, parseNumber(value));
        }
    });
    return <Input {...props} />;
}

NumericInput.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.number
};
