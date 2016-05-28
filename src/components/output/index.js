import {PropTypes} from 'react';
import Input from '../input';

export default function Output({label, value}) {
    return (<Input label={label}>
        <strong className="input__display">{value}</strong>
    </Input>);
}

Output.propTypes = {
    label: PropTypes.string,
    value: PropTypes.node
};
