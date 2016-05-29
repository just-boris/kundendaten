export const ADD_APPLICANT = 'scsi/ADD_APPLICANT';
export const REMOVE_APPLICANT = 'scsi/REMOVE_APPLICANT';
export const UPDATE_APPLICANT = 'scsi/UPDATE_APPLICANT';
export const SAVE_APPLICANT = 'scsi/SAVE_APPLICANT';

export function addApplicant() {
    return {
        type: ADD_APPLICANT
    };
}

export function removeApplicant(applicant) {
    return {
        type: REMOVE_APPLICANT,
        applicant
    };
}

export function updateApplicant(index, field, value) {
  return {
    type: UPDATE_APPLICANT,
    field, index, value
  };
}

export function saveApplicant() {
  return (dispatch, getState) => {
      console.log(getState().applicants.map(applicant => applicant.toJSON())); //eslint-disable-line no-console
  };
}
