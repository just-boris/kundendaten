export const UPDATE_ACCOUNT = 'scsi/UPDATE_ACCOUNT';
export const SAVE_ACCOUNT = 'scsi/SAVE_ACCOUNT';

export function updateAccount(fieldName, value) {
  return {
    type: UPDATE_ACCOUNT,
    fieldName, value
  };
};


export function saveAccount() {
  return (dispatch, getState) => {
      console.log(getState());
  }
};
