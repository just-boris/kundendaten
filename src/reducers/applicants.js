import {ADD_APPLICANT, REMOVE_APPLICANT, UPDATE_APPLICANT} from '../actions';

function newApplicant() {
    return {total: 0};
}

function calculateTotal({salary = 0, otherIncome = 0, rent = 0, otherExpense = 0}) {
    return salary + otherIncome - rent - otherExpense;
}

function applicantReducer(state, action) {
    switch (action.type) {
        case UPDATE_APPLICANT: {
            const newState = Object.assign({}, state, {
                [action.fieldName]: action.value
            });
            newState.total = calculateTotal(newState);
            return newState;
        }
        default:
            return state;
    }
}

export default function(state = [newApplicant()], action) {
    switch (action.type) {
        case ADD_APPLICANT:
            return [...state, newApplicant()];
        case REMOVE_APPLICANT:
            return state.filter(applicant => applicant !== action.applicant);
        case UPDATE_APPLICANT:
            return state.map((applicant, index) => {
                if(action.index === index) {
                    return applicantReducer(applicant, action);
                }
                return applicant;
            });
        default:
            return state;
    }
}
