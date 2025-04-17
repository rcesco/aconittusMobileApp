import React, {useState, useRef, useEffect} from 'react';
import {Alert, Image, Linking} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';

import logo from '../../../assets/logo.png';

import {signInRequest} from '../../../store/modules/auth/actions';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignText,
} from './styles';

export default function SignIn({navigation}) {
  useEffect(() => {
    //checkUpdateNeeded();
  }, []);

  const dispatch = useDispatch();
  const passwordRef = useRef();

  const openWebsite = () => {
    const url = 'https://www.aconittus.com.br/privacyPolice.php';
    Linking.openURL(url).catch(err =>
      console.error('Erro ao tentar abrir o URL', err),
    );
  };

  const loading = useSelector(state => state.auth.loading);

  const [username, setUsername] = useState('067.804.049-42');
  const [password, setPassword] = useState('adm123');
  const [codeBranch, setCodeBranch] = useState('');
  const netInfo = useNetInfo();

  function handleSignIn() {
    //console.log(username, password, codeBranch);
    dispatch(signInRequest(username, password, codeBranch));
  }

  return (
    <Container>
      <Image source={logo} />
      <Form>
        <FormInput
          icon="account"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Digite Seu Usuário"
          onChangeText={setUsername}
          value={username}
        />
        <FormInput
          icon="lock-outline"
          secureTextEntry
          placeholder="Sua Senha"
          autoCapitalize="none"
          onChangeText={setPassword}
          value={password}
          ref={passwordRef}
        />
        <FormInput
          icon="account"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Digite o código da sua empresa"
          onChangeText={setCodeBranch}
          value={codeBranch}
        />
        <SubmitButton loading={loading} onPress={() => handleSignIn()}>
          Acessar
        </SubmitButton>
        <SignLink onPress={openWebsite}>
          <SignText>Política de Privacidade</SignText>
        </SignLink>
      </Form>
    </Container>
  );
}

SignIn.navigationOptions = {
  title: 'Acesso Ao Sistema',
  headerShown: false,
};
