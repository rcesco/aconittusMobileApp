export function updateProfileRequest(currentPassword, newPassword) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: {currentPassword, newPassword},
  };
}

export function updateProfileSuccess(token) {
  return {
    type: '@auth/SIGN_OUT',
    payload: {token},
  };
}

export function updateProfileFailure() {
  return {type: '@user/UPDATE_PROFILE_FAILURE'};
}
