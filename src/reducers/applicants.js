import {LOAD_APPLICANTS, ADD_APPLICANT, REMOVE_APPLICANT, UPDATE_APPLICANT} from '../actions';
import {Map, fromJS} from 'immutable';
import path from '../util/path';

const SHARED_HOSEHOLD_FIELDS = [
    'household.numberOfPersons',
    'household.numberOfChildren',
    'household.accomodationType',
    'household.estateType'
];

function newApplicant() {
    return new Map();
}

function applySharedHousehold(source, ...applicants) {
    return [
        source,
        ...applicants.map(applicant => applicant.withMutations(applicant => {
            SHARED_HOSEHOLD_FIELDS.forEach(field =>
                applicant.setIn(path(field), source.getIn(path(field)))
           );
       }))
    ];
}

function updateApplicant(state, action) {
    const sharedHousehold = state.find(applicant => applicant.getIn(path('household.shared')));
    const syncField = sharedHousehold && SHARED_HOSEHOLD_FIELDS.indexOf(action.field) > -1;

    if(action.field === 'household.shared' && action.value) {
        state = applySharedHousehold(...state);
    }
    return state.map((applicant, index) => {
        if(action.index === index || syncField) {
            return applicant.setIn(path(action.field), action.value);
        }
        return applicant;
    });
}

export default function(state = [newApplicant()], action) {
    switch (action.type) {
        case LOAD_APPLICANTS:
            return action.applicants.map(applicant => fromJS(applicant));
        case ADD_APPLICANT:
            return [...state, newApplicant()];
        case REMOVE_APPLICANT:
            return state.filter((applicant, index) => index !== action.index);
        case UPDATE_APPLICANT:
            return updateApplicant(state, action);
        default:
            return state;
    }
}
