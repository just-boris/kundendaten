import Accordion from '../accordion';
import NumericInput from '../numeric-input';

export default function PersonEdit({applicants, onChange}) {
    return (<Accordion title="Einkommen">
        <div className="applicants">
            {applicants.map((applicant, index) => (<div className="applicants__col" key={index}>
            <NumericInput name="salary" label="Gehalt" value={applicant.salary} onChange={(name, value) => onChange(index, name, value)} />
            <NumericInput name="otherIncome" label="Sonstige Einkommen" value={applicant.salary} onChange={(name, value) => onChange(index, name, value)} />
            </div>))}
        </div>
    </Accordion>);
}
