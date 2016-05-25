import './styles.css';
import {addApplicant, updateApplicant, removeApplicant} from '../../actions';
import {connect} from 'react-redux';
import Input from '../input';
import Output from '../output';
import NumericInput from '../numeric-input';

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
        <NumericInput name="otherIncome" label="Andere Einkommen" value={applicant.salary} onChange={onChange} />
        <h2>Expenses</h2>
        <NumericInput name="rent" label="Miete" onChange={onChange} />
        <NumericInput name="otherExpense" label="Andere Expense" onChange={onChange} />
        <h2>Gesamt</h2>
        <Output name="total" label="Ergebnis" value={applicant.total} />
    </div>);
}

export default connect(null, {addApplicant, updateApplicant, removeApplicant})(Applicant);
