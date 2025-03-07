import React, {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Alert} from 'react-native';

import {signOut} from '../../store/modules/auth/actions';
import {updateProfileRequest} from '../../store/modules/user/actions';

import DeviceInfo from 'react-native-device-info';

import {
  Container,
  AvatarContainer,
  AvatarImage,
  Name,
  Username,
  Email,
  CurrentPassword,
  NewPassword,
  ConfirmationPassword,
  ProfileButtons,
  ProfileContainer,
  UpdateProfileButton,
  LogoutButton,
  Separator,
  Background,
} from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();

  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmationPasswordRef = useRef();

  const [avatarImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');

  function handleSignOut() {
    dispatch(signOut());
  }

  function handleVersion() {
    const version = DeviceInfo.getVersion();
    Alert.alert(`Sua Versão do Aplicativo é ${version}`);
  }

  function handleUpdatePassword() {
    if (newPassword !== confirmationPassword) {
      Alert.alert('Novas Senhas não conferem!');
    } else {
      dispatch2(updateProfileRequest(currentPassword, newPassword));
    }
  }

  useEffect(() => {
    console.log(profile);
    if (profile && Object.keys(profile).length > 0) {
      setName(profile?.name_person || '');
      setUsername(profile?.name || '');
      setEmail(profile?.email || '');
    }
  }, [profile]);

  return (
    <Background>
      <Container>
        <AvatarContainer>
          <AvatarImage source={{uri: avatarImage}} />
        </AvatarContainer>
        <ProfileContainer>
          <Name
            icon="account"
            placeholder="Digite seu Nome"
            autoCapitalize="none"
            autoCorrect={false}
            value={name}
            onChangeText={setName}
            editable={false}
          />
          <Username
            icon="account"
            placeholder="Digite seu Usuário"
            autoCapitalize="none"
            autoCorrect={false}
            value={username}
            onChangeText={setUsername}
            editable={false}
          />
          <Email
            icon="mail"
            placeholder="Digite seu Email"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            editable={false}
          />
          <Separator />
          <CurrentPassword
            icon="lock-outline"
            secureTextEntry
            ref={currentPasswordRef}
            placeholder="Digite sua senha atual"
            autoCapitalize="none"
            autoCorrect={false}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <NewPassword
            icon="lock-outline"
            secureTextEntry
            ref={newPasswordRef}
            placeholder="Digite sua nova senha"
            autoCapitalize="none"
            autoCorrect={false}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <ConfirmationPassword
            icon="lock-outline"
            secureTextEntry
            ref={confirmationPasswordRef}
            placeholder="Repita sua nova senha"
            autoCapitalize="none"
            autoCorrect={false}
            value={confirmationPassword}
            onChangeText={setConfirmationPassword}
          />
        </ProfileContainer>
        <ProfileButtons>
          <UpdateProfileButton onPress={() => handleVersion()}>
            Versão
          </UpdateProfileButton>
          <LogoutButton onPress={() => handleSignOut()}>Sair</LogoutButton>
        </ProfileButtons>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  title: 'Meu Perfil',
};
