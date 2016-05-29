import Accordion from '../accordion';
import Applicants from '../applicants';
import NumericInput from '../numeric-input';
import fieldConfig from '../../util/buildFieldConfig';

export default function PersonEdit({applicants, onChange}) {
    return (<Accordion title="Einkommen">
        <Applicants applicants={applicants}>
            {(applicant, index) => (<div>
                <NumericInput label="Gehalt" {...fieldConfig('income.salary', applicant, (name, value) => onChange(index, name, value))} />
                <NumericInput label="Sonstige Einkommen" {...fieldConfig('income.other', applicant, (name, value) => onChange(index, name, value))} />
            </div>)}
        </Applicants>
    </Accordion>);
}
