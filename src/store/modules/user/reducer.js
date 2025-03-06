import {produce} from 'immer';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile.name = action.payload.name;
        draft.profile.email = action.payload.email;
        draft.profile.cellphone = action.payload.cellphone;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
