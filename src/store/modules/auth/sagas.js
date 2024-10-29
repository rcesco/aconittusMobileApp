import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';

import Api from '../../../services/api';

import {
  signInSuccess,
  signFailure,
  signUpSuccess,
  signUpFailure,
  lostPasswordSuccess,
  lostPasswordFailure,
} from './actions';

export function* signIn({payload}) {
  try {
    const {email, password} = payload;

    const response = yield call(Api.post, 'session/app', {
      email,
      password,
    });

    if (response.status === 200) {
      const {user, token} = response.data;

      Api.defaults.headers.user = user.iduser;
      Api.defaults.headers.Authorization = `Bearer ${token}`;
      Api.defaults.headers.person = user.person_id;

      yield put(signInSuccess(user.name, user.iduser, token, user.person_id));
    } else {
      yield put(signFailure());
    }
  } catch (err) {
    Alert.alert('Falha de Autenticação', 'Verifique seu Usuário/Senha!');

    yield put(signFailure());
  }
}

export function* signUp({payload}) {
  try {
    const {cpf, user, password, email} = payload;

    const response = yield call(Api.post, '/login/signUpApp', {
      username: user,
      password,
      doc: cpf,
      email,
    });

    if (response.status === 203) {
      Alert.alert('CPF não está na base de dados');
      yield put(signUpFailure());
    } else if (response.status === 201) {
      Alert.alert('Usuário já cadastrado!');
      yield put(signUpFailure());
    } else {
      Alert.alert('Usuário Cadastrado!');
      yield put(signUpSuccess());
    }
  } catch (err) {
    Alert.alert('Falha no Cadastro');
    yield put(signUpFailure());
  }
}

export function* lostPassword({payload}) {
  try {
    const {user, email} = payload;

    const response = yield call(Api.post, 'login/lostPasswordApp', {
      user,
      email,
    });

    if (response.status === 200) {
      Alert.alert('', response.data.msg);
      yield put(lostPasswordSuccess());
    } else {
      yield put(lostPasswordFailure());
    }
  } catch (err) {
    Alert.alert('Erro ao Solicitar nova Senha', 'Verifique seu Usuário/Email!');
    yield put(lostPasswordFailure());
  }
}

export function setAuthParams({payload}) {
  if (!payload || !payload.auth || !payload.auth.id_user) {
    return;
  }

  const {user, id_user} = payload.auth;
  //const {id} = payload.user.profile;
  if (user && id_user) {
    Api.defaults.headers.user = user;
    Api.defaults.headers.token = id_user;
    //Api.defaults.headers.person = id;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setAuthParams),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/LOST_PASSWORD_REQUEST', lostPassword),
]);