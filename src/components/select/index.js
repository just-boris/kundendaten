import Input from '../input';
import {PropTypes} from 'react';
import omit from 'lodash/omit';

export default function Select(props) {
    const inputProps = omit(props, ['options', 'onChange']);
    const {options, onChange} = props;

    return (<Input {...inputProps}>
        <select className="input__control" onChange={e => onChange(props.name, e.target.value)}>
            <option key="" value="">-- Bitte auswählen --</option>
            {options.map(({value, name}) => <option value={value} key={value}>{name}</option>)}
        </select>
    </Input>);
}

Select.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object)
};
