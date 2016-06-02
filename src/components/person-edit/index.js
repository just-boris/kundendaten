import Input from '../input';
import fieldConfig from '../../util/buildFieldConfig';

export default function PersonEdit({applicant, index, onChange}) {
    return (<div>
        <Input label="Vorname" {...fieldConfig('person.firstName', applicant, (name, value) => onChange(index, name, value))} />
        <Input label="Name" {...fieldConfig('person.lastName', applicant, (name, value) => onChange(index, name, value))} />
    </div>);
}
