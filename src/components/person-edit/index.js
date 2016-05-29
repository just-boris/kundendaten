import Accordion from '../accordion';
import Applicants from '../applicants';
import Input from '../input';
import fieldConfig from '../../util/buildFieldConfig';

export default function PersonEdit({applicants, onChange}) {
    return (<Accordion title="Person">
        <Applicants applicants={applicants}>
            {(applicant, index) => (<div>
                <Input label="Vorname" {...fieldConfig('person.firstName', applicant, (name, value) => onChange(index, name, value))} />
                <Input label="Name" {...fieldConfig('person.lastName', applicant, (name, value) => onChange(index, name, value))} />
            </div>)}
        </Applicants>
    </Accordion>);
}
