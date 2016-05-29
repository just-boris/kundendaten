import Accordion from '../accordion';
import Applicants from '../applicants';
import NumericInput from '../numeric-input';
import fieldConfig from '../../util/buildFieldConfig';

export default function PersonEdit({applicants, onChange}) {
    return (<Accordion title="Ausgaben">
        <Applicants applicants={applicants}>
            {(applicant, index) => (<div>
                <NumericInput label="Miete" {...fieldConfig('expense.rent', applicant, (name, value) => onChange(index, name, value))} />
                <NumericInput label="Sonstige Ausgaben" {...fieldConfig('expense.other', applicant, (name, value) => onChange(index, name, value))} />
            </div>)}
        </Applicants>
    </Accordion>);
}
