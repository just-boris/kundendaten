import './styles.css';
import {connect} from 'react-redux';
import {saveApplicant} from '../../actions';
import Applicant from '../applicant';

function App({applicants, saveApplicant}) {
    function onSubmit(e) {
        e.preventDefault();
        saveApplicant();
    }

    return (<form className="app" onSubmit={onSubmit}>
        <h1 className="app__header">Kundendaten</h1>
        <div className="app__row app__applicants">
            {applicants.map((applicant, index) =>
                <Applicant applicant={applicant} index={index} key={index}
                    allowAdd={applicants.length < 2} allowRemove={index === 1}/>
            )}
        </div>
        <div className="app__row app__row_center">
            <button type="submit" className="app__save">Spreichen</button>
        </div>
    </form>);
}

function mapProps({applicants}) {
    return {applicants};
}

const mapActions = {saveApplicant};

export default connect(mapProps, mapActions)(App);
