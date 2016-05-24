import {UPDATE_ACCOUNT, SAVE_ACCOUNT} from '../actions';

function calculateTotal({salary = 0, otherIncome = 0, rent = 0, otherExpense = 0}) {
    return salary + otherIncome - rent - otherExpense;
}

export default function(state = {total: 0}, action) {
    switch (action.type) {
        case UPDATE_ACCOUNT:
            const newState = Object.assign({}, state, {
                [action.fieldName]: action.value
            });
            newState.total = calculateTotal(newState);
            return newState;
        default:
            return state;
    }
}
