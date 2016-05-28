import Accordion from '../accordion';
import NumericInput from '../numeric-input';
import Select from '../select';

const accomodationOptions = [
    {value: 'ESTATE', name: 'Wohneigentum'},
    {value: 'MILITARY', name: 'beim Militär'},
    {value: 'PARENTS', name: 'bei den Eltern'},
    {value: 'RENT', name: 'zur Miete'},
    {value: 'RENT_FREE', name: 'Mietfrei'}
];

export default function PersonEdit({applicants, onChange}) {
    return (<Accordion title="Ausgaben">
        <div className="applicants">
            {applicants.map((applicant, index) => (<div className="applicants__col" key={index}>
                <NumericInput name="rent" label="Miete" onChange={(name, value) => onChange(index, name, value)} />
                <NumericInput name="otherExpense" label="Sonstige Ausgaben" onChange={(name, value) => onChange(index, name, value)} />
                <Select name="accomodationType" label="Wohnsituation" options={accomodationOptions} onChange={(name, value) => onChange(index, name, value)} />
            </div>))}
        </div>
    </Accordion>);
}
