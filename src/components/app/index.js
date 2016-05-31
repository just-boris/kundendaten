import './styles.css';
import {connect} from 'react-redux';
import {addApplicant, updateApplicant, removeApplicant, saveApplicant} from '../../actions';
import PersonEdit from '../person-edit';
import IncomeEdit from '../income-edit';
import ExpenseEdit from '../expense-edit';
import HouseholdEdit from '../household-edit';
import SummaryOutput from '../summary-output';

function App({applicants, addApplicant, updateApplicant, removeApplicant, saveApplicant}) {
    function onSubmit(e) {
        e.preventDefault();
        saveApplicant();
    }

    return (<form className="app" onSubmit={onSubmit}>
        <h1 className="app__header">Kundendaten</h1>
        <div className="app__row applicants">
        {applicants.map((applicant, index) => {
            const allowAdd = applicants.length < 2;
            const allowRemove = index > 0;
            return (<div className="applicants__col" key={index}>
                { allowAdd && <a className="app__action" onClick={addApplicant}>Fügen zweite Antragsteller</a> }
                { allowRemove && <a className="app__action" onClick={() => removeApplicant(applicant)}>Entfernen zweite Antragsteller</a> }
                <h2 className="app__title">Antragsteller #{index + 1}</h2>
            </div>);
        })}
        </div>
        <div className="app__row"><PersonEdit applicants={applicants} onChange={updateApplicant} /></div>
        <div className="app__row"><IncomeEdit applicants={applicants} onChange={updateApplicant} /></div>
        <div className="app__row"><ExpenseEdit applicants={applicants} onChange={updateApplicant} /></div>
        <div className="app__row"><HouseholdEdit applicants={applicants} onChange={updateApplicant} /></div>
        <div className="app__row"><SummaryOutput applicants={applicants} /></div>
        <div className="app__row app__row_center">
            <button type="submit" className="app__save">Spreichen</button>
        </div>
    </form>);
}

function mapProps({applicants}) {
    return {applicants};
}

const mapActions = {addApplicant, updateApplicant, removeApplicant, saveApplicant};

export default connect(mapProps, mapActions)(App);
