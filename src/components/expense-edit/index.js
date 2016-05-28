import Accordion from '../accordion';
import NumericInput from '../numeric-input';

export default function PersonEdit({applicants, onChange}) {
    return (<Accordion title="Ausgaben">
        <div className="applicants">
            {applicants.map((applicant, index) => (<div className="applicants__col" key={index}>
                <NumericInput name="rent" label="Miete" onChange={(name, value) => onChange(index, name, value)} />
                <NumericInput name="otherExpense" label="Sonstige Ausgaben" onChange={(name, value) => onChange(index, name, value)} />
            </div>))}
        </div>
    </Accordion>);
}
