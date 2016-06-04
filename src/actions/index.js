import axios from 'axios';

export const LOAD_APPLICANTS = 'scsi/LOAD_APPLICANTS';
export const ADD_APPLICANT = 'scsi/ADD_APPLICANT';
export const REMOVE_APPLICANT = 'scsi/REMOVE_APPLICANT';
export const UPDATE_APPLICANT = 'scsi/UPDATE_APPLICANT';
export const SAVE_APPLICANTS = 'scsi/SAVE_APPLICANTS';

export function loadApplicants(accountId) {
    return (dispatch) => {
        return axios.get(`/api/accounts/${accountId}`).then(response => {
            dispatch({
                type: LOAD_APPLICANTS,
                applicants: response.data.applicants
            });
        });
    };
}

export function saveApplicants(accountId) {
  return (dispatch, getState) => {
      return axios.put(`/api/accounts/${accountId}`, {
          id: parseInt(accountId, 10),
          applicants: getState().applicants.map(applicant => applicant.toJSON())
      });
  };
}

export function addApplicant() {
    return {
        type: ADD_APPLICANT
    };
}

export function removeApplicant(index) {
    return {
        type: REMOVE_APPLICANT,
        index
    };
}

export function updateApplicant(index, field, value) {
  return {
    type: UPDATE_APPLICANT,
    field, index, value
  };
}
