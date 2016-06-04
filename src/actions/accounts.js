export const LOAD_ACCOUNTS = 'scsi/LOAD_ACCOUNTS';
import axios from 'axios';

export function loadAccounts() {
    return (dispatch) => {
        return axios.get('/api/accounts').then(response => {
            dispatch({
                type: LOAD_ACCOUNTS,
                accounts: response.data
            });
        });
    };
}
