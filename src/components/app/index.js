import './styles.css';
import {Component} from 'react';
import {array, func} from 'react/lib/ReactPropTypes';
import {connect} from 'react-redux';
import {addApplicant, updateApplicant, removeApplicant, saveApplicant} from '../../actions';
import Accordion from '../accordion';
import Applicants from '../applicants';
import PersonEdit from '../person-edit';
import IncomeEdit from '../income-edit';
import ExpenseEdit from '../expense-edit';
import HouseholdEdit from '../household-edit';
import SummaryOutput from '../summary-output';

export class App extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.renderApplicantHeader = this.renderApplicantHeader.bind(this);
        this.subComponents = [
            this.createEditBlock('Person', PersonEdit),
            this.createEditBlock('Einkommen', IncomeEdit),
            this.createEditBlock('Ausgaben', ExpenseEdit),
            this.createEditBlock('Haushalt', HouseholdEdit)
        ];
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.saveApplicant();
    }

    createEditBlock(title, EditComponent) {
        const renderSubcomponent = (applicant, index) =>
            <EditComponent applicant={applicant} index={index} onChange={this.props.updateApplicant} />;
        return () => (<Accordion title={title} key={title}>
            <Applicants applicants={this.props.applicants}>
                {renderSubcomponent}
            </Applicants>
        </Accordion>);
    }

    renderApplicantHeader(applicant, index) {
        const {addApplicant, removeApplicant, applicants} = this.props;
        const allowAdd = applicants.length < 2;
        const allowRemove = index > 0;
        return (<div className="app__applicant">
            { allowAdd && <a className="app__action" onClick={addApplicant}>Fügen zweite Antragsteller</a> }
            { allowRemove && <a className="app__action" onClick={() => removeApplicant(index)}>Entfernen zweite Antragsteller</a> }
            <h2 className="app__title">Antragsteller #{index + 1}</h2>
        </div>);
    }

    render() {
        const {applicants} = this.props;
        return (<form className="app" onSubmit={this.onSubmit}>
            <h1 className="app__header">Kundendaten</h1>
            <div className="app__content">
                <Applicants applicants={applicants}>{this.renderApplicantHeader}</Applicants>
                {this.subComponents.map(render => render())}
                <div className="accordion">
                    <h2 className="accordion__title">Gesamt</h2>
                    <div className="accordion__body">
                        <Applicants applicants={applicants}>
                            {(applicant, index) => <SummaryOutput applicant={applicant} index={index} />}
                        </Applicants>
                    </div>
                </div>
                <div className="app__center">
                    <button type="submit" className="app__save">Spreichen</button>
                </div>
            </div>
        </form>);
    }
}

App.propTypes = {
    applicants: array,
    addApplicant: func,
    updateApplicant: func,
    removeApplicant: func,
    saveApplicant: func
};

function mapProps({applicants}) {
    return {applicants};
}

const mapActions = {addApplicant, updateApplicant, removeApplicant, saveApplicant};

export default connect(mapProps, mapActions)(App);
