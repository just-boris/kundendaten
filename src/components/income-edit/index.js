import NumericInput from '../numeric-input';
import fieldConfig from '../../util/buildFieldConfig';

export default function PersonEdit({applicant, index, onChange}) {
    return (<div>
        <NumericInput label="Gehalt" {...fieldConfig('income.salary', applicant, (name, value) => onChange(index, name, value))} />
        <NumericInput label="Sonstige Einkommen" {...fieldConfig('income.other', applicant, (name, value) => onChange(index, name, value))} />
    </div>);
}
