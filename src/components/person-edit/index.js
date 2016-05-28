import Accordion from '../accordion';
import Input from '../input';

export default function PersonEdit({applicants, onChange}) {
    return (<Accordion title="Person">
        <div className="applicants">
            {applicants.map((applicant, index) => (<div className="applicants__col" key={index}>
                <Input name="firstName" value={applicant.firstName} label="Vorname" onChange={(name, value) => onChange(index, name, value)} />
                <Input name="lastName" value={applicant.lastName} label="Name" onChange={(name, value) => onChange(index, name, value)} />
            </div>))}
        </div>
    </Accordion>);
}
