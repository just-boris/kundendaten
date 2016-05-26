import './styles.css';
import {addApplicant, updateApplicant, removeApplicant} from '../../actions';
import {connect} from 'react-redux';
import Input from '../input';
import Output from '../output';
import NumericInput from '../numeric-input';
import Select from '../select';

const accomodationOptions = [
    {value: 'ESTATE', name: 'Wohneigentum'},
    {value: 'MILITARY', name: 'beim Militär'},
    {value: 'PARENTS', name: 'bei den Eltern'},
    {value: 'RENT', name: 'zur Miete'},
    {value: 'RENT_FREE', name: 'Mietfrei'}
];

function Applicant({applicant, index, addApplicant, updateApplicant, removeApplicant, allowAdd, allowRemove}) {
    function onChange(name, value) {
        updateApplicant(index, name, value);
    }
    return (<div className="applicant">
        <h2>
            Applicant #{index + 1}
            { allowAdd && <a className="applicant__action" onClick={addApplicant}>Fügen zweite Antragsteller</a> }
            { allowRemove && <a className="applicant__action" onClick={() => removeApplicant(applicant)}>Entfernen zweite Antragsteller</a> }
        </h2>
        <Input name="firstName" value={applicant.firstName} label="Vorname" onChange={onChange} />
        <Input name="lastName" value={applicant.lastName} label="Name" onChange={onChange} />
        <h2>Einkommen</h2>
        <NumericInput name="salary" label="Gehalt" value={applicant.salary} onChange={onChange} />
        <NumericInput name="otherIncome" label="Sonstige Einkommen" value={applicant.salary} onChange={onChange} />
        <h2>Ausgaben</h2>
        <NumericInput name="rent" label="Miete" onChange={onChange} />
        <NumericInput name="otherExpense" label="Sonstige Ausgaben" onChange={onChange} />
        <Select name="accomodationType" label="Wohnsituation" options={accomodationOptions} onChange={onChange} />
        <h2>Gesamt</h2>
        <Output name="total" label="Ergebnis" value={applicant.total} />
    </div>);
}

export default connect(null, {addApplicant, updateApplicant, removeApplicant})(Applicant);
