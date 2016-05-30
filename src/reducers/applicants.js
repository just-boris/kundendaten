import {ADD_APPLICANT, REMOVE_APPLICANT, UPDATE_APPLICANT} from '../actions';
import Immutable from 'immutable';
import path from '../util/path';

function newApplicant() {
    return Immutable.fromJS({total: 0});
}

function calculateTotal(state) {
    const salary = state.getIn(path('income.salary'), 0);
    const otherIncome = state.getIn(path('income.other'), 0);
    const rent = state.getIn(path('expense.rent'), 0);
    const otherExpense = state.getIn(path('expense.other'), 0);
    return salary + otherIncome - rent - otherExpense;
}

const SHARED_HOSEHOLD_FIELDS = [
    'household.numberOfPersons',
    'household.numberOfChildren',
    'household.accomodationType',
    'household.estateType'
];

function applySharedHousehold(source, ...applicants) {
    return [
        source,
        ...applicants.map(applicant => applicant.withMutations(applicant => {
            return SHARED_HOSEHOLD_FIELDS.reduce((applicant, field) => {
                return applicant.setIn(path(field), source.getIn(path(field)));
            }, applicant);
        }))
    ];
}

function applicantReducer(state, action) {
    switch (action.type) {
        case UPDATE_APPLICANT: {
            return state.withMutations(state =>
                state.setIn(action.field.split('.'), action.value).set('total', calculateTotal(state))
            );
        }
        default:
            return state;
    }
}

function updateApplicant(state, action) {
    const sharedHousehold = state.find(applicant => applicant.getIn(['household', 'shared']));
    const syncField = sharedHousehold && SHARED_HOSEHOLD_FIELDS.indexOf(action.field) > -1;
    if(action.field === 'household.shared' && action.value) {
        state = applySharedHousehold(...state);
    }
    return state.map((applicant, index) => {
        if(action.index === index || syncField) {
            return applicantReducer(applicant, action);
        }
        return applicant;
    });
}

export default function(state = [newApplicant()], action) {
    switch (action.type) {
        case ADD_APPLICANT:
            return [...state, newApplicant()];
        case REMOVE_APPLICANT:
            return state.filter(applicant => applicant !== action.applicant);
        case UPDATE_APPLICANT:
            return updateApplicant(state, action);
        default:
            return state;
    }
}
