import {LOAD_ACCOUNTS} from '../actions/accounts';

export default function(state = [], action) {
    switch(action.type) {
        case LOAD_ACCOUNTS:
            return action.accounts;
        default:
            return state;
    }
}
