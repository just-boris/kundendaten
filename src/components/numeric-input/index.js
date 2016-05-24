import Input from '../input';

function formatNumber(number) {
    return number && number.toString().replace('.', ',');
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
    })
    return <Input {...props} />;
}
