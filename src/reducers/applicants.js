import {ADD_APPLICANT, REMOVE_APPLICANT, UPDATE_APPLICANT} from '../actions';
import {Map} from 'immutable';
import path from '../util/path';

function newApplicant() {
    return new Map();
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
        case UPDATE_APPLICANT:
            return state.setIn(action.field.split('.'), action.value);
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
