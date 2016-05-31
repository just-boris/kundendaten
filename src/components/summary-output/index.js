import {createSelector} from 'reselect';
import path from '../../util/path';
import Applicants from '../applicants';
import Output from '../output';

const totalSelector = createSelector(
    state => state.getIn(path('income.salary'), 0),
    state => state.getIn(path('income.other'), 0),
    state => state.getIn(path('expense.rent'), 0),
    state => state.getIn(path('expense.other'), 0),
    (salary, otherIncome, rent, otherExpense) => salary + otherIncome - rent - otherExpense
);

export default function SummaryOutput({applicants}) {
    return (<div>
        <h2 className="accordion__title">Gesamt</h2>
        <div className="accordion__body">
            <Applicants applicants={applicants}>{(applicant) =>
                <Output name="total" label="Ergebnis" value={totalSelector(applicant)} />
            }</Applicants>
        </div>
    </div>);
}
