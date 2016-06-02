import './style.css';
import {array, func} from 'react/lib/ReactPropTypes';

export default function Applicants({applicants, children}) {
    return (<div className="applicants">
        {applicants.map((applicant, index) =>
            <div className="applicants__col" key={index}>{children(applicant, index)}</div>
        )}
    </div>);
}

Applicants.propTypes = {
    applicants: array,
    children: func
};
