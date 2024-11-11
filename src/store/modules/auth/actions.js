export function signInRequest(email, password, codeBranch) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {email, password, codeBranch},
  };
}

export function signInSuccess(user, id_user, token, person) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {user, id_user, token, person},
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}

export function signUpRequest(cpf, user, password, email) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {cpf, user, password, email},
  };
}

export function signUpSuccess() {
  return {
    type: '@auth/SIGN_UP_SUCCESS',
  };
}

export function signUpFailure() {
  return {
    type: '@auth/SIGN_UP_FAILURE',
  };
}

export function lostPasswordRequest(user, email) {
  return {
    type: '@auth/LOST_PASSWORD_REQUEST',
    payload: {user, email},
  };
}

export function lostPasswordSuccess() {
  return {
    type: '@auth/LOST_PASSWORD_SUCCESS',
  };
}

export function lostPasswordFailure() {
  return {
    type: '@auth/LOST_PASSWORD_FAILURE',
  };
}
