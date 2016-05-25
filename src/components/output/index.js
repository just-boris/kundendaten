import {PropTypes} from 'react';

export default function Output({label, value}) {
    return (<span>{label}: {value}</span>);
}

Output.propTypes = {
    label: PropTypes.string,
    value: PropTypes.node
};
