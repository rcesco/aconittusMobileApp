import {produce} from 'immer';

const INITIAL_STATE = {
  user: null,
  id_user: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.user = action.payload.user;
        draft.id_user = action.payload.id_user;
        draft.token = action.payload.token;
        draft.person = action.payload.person;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_IN_FAILURE': {
        draft.user = '';
        draft.id_user = '';
        draft.signed = false;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_UP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_UP_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_UP_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.user = null;
        draft.id_user = null;
        draft.signed = false;
        draft.loading = false;
        break;
      }
      case '@auth/LOST_PASSWORD_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/LOST_PASSWORD_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/LOST_PASSWORD_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
