import NumericInput from '../numeric-input';
import fieldConfig from '../../util/buildFieldConfig';

export default function PersonEdit({applicant, index, onChange}) {
    return (<div>
        <NumericInput label="Miete" {...fieldConfig('expense.rent', applicant, (name, value) => onChange(index, name, value))} />
        <NumericInput label="Sonstige Ausgaben" {...fieldConfig('expense.other', applicant, (name, value) => onChange(index, name, value))} />
    </div>);
}
