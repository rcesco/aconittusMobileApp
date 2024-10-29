import {takeLatest, call, put, all} from 'redux-saga/effects';
import {Alert} from 'react-native';
import Api from '../../../services/api';

import {updateProfileSuccess, updateProfileFailure} from './actions';

export function* updatePassword({payload}) {
  try {
    const {currentPassword, newPassword} = payload;

    const response = yield call(Api.post, '/login/updatePasswordApp', {
      current_password: currentPassword,
      new_password: newPassword,
    });

    const {token} = response.data;

    Alert.alert('Senha alterada com sucesso!');
    yield put(updateProfileSuccess(token));
  } catch (error) {
    Alert.alert('Ocorreu um erro ao alterar senhas!');
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updatePassword),
]);
