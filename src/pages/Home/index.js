import React, {useEffect} from 'react';
import {Alert, Image, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {signOut} from '../../store/modules/auth/actions';
import VersionCheck from 'react-native-version-check';

import Api from '../../services/api';

import {
  Container,
  ButtonHome,
  ButtonText,
  ButtonsList,
  ButtonIcon,
  HeaderContainer,
  HeaderText,
  HeaderTitle,
  ContainerImage,
} from './styles';

import logo from '../../assets/logo.png';

import HomeButton from '../../components/HomeButton';
import InputLarge from '../../components/InputLarge';

export default function Home({navigation}) {
  const stylesImage = StyleSheet.create({
    image: {
      width: '100%', // A imagem ocupa 100% da largura do container
      height: '100%',
    },
  });

  const dispatch = useDispatch();

  const user = useSelector(state => state.auth);
  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    handleSignIn();
  }, [user]);

  function handleDss() {
    navigation.navigate('DssList');
  }

  function handleChecklist() {
    navigation.navigate('ChecklistList');
  }

  function handleInformative() {
    navigation.navigate('Informative');
  }

  function handleGuide() {
    navigation.navigate('Guide');
  }

  function handleRotogram() {
    navigation.navigate('Rotogram');
  }

  function handleTireInspection() {
    navigation.navigate('TireInspection');
  }

  function handlePersonAssessment() {
    navigation.navigate('PersonAssessmentList');
  }

  function handleSignIn() {
    if (!user.signed) {
      Alert.alert('Você está deslogado! Por favor Faça o Login');
      dispatch(signOut());
    } else {
      Api.defaults.headers.user = user.id_user;
      Api.defaults.headers.Authorization = `Bearer ${user.token}`;
      Api.defaults.headers.person = user.person;
    }
  }

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>Bem Vindo {profile.name_person}! </HeaderTitle>
        <HeaderText>
          Desejamos que tenha uma ótima jornada de trabalho! Lembre-se de todos
          os precedimentos de segurança, a vida em primeiro lugar!
        </HeaderText>
      </HeaderContainer>
      <ButtonsList>
        <HomeButton
          onPress={() => handleChecklist()}
          icon="clipboard-list"
          text="Checklists"
          color="#36BA98"
        />
        <HomeButton
          onPress={() => handleDss()}
          icon="message-video"
          text="DSS"
          color="#E9C46A"
        />
        {/* <HomeButton icon="book-education" text="Treinamentos" color="#E94560" />
        <HomeButton
          icon="clipboard-text-play"
          text="Lições Aprendidas"
          color="#C84B31"
        />*/}
        <HomeButton
          onPress={() => handleRotogram()}
          icon="road"
          text="Rotogramas"
          color="#F4A261"
        />
        {/*<HomeButton
          icon="clipboard"
          text="Avaliações de Condução"
          color="#116D6E"
        />*/}
        <HomeButton
          onPress={() => handleInformative()}
          icon="exclamation-thick"
          text="Informativos"
          color="#E76F51"
        />
        {/*<HomeButton icon="bulletin-board" text="Mural" color="#F4DFC8" />*/}
        <HomeButton
          onPress={() => handleGuide()}
          icon="book-open-page-variant"
          text="Manuais e Políticas"
          color="#6A80B9"
        />

        <HomeButton
          onPress={() => handleTireInspection()}
          icon="tire"
          text="Inspeção de Pneus"
          color="#6A8043"
        />

        <HomeButton
          onPress={() => handlePersonAssessment()}
          icon="file-account-outline"
          text="Avaliação de Pessoa"
          color="#2A8043"
        />
      </ButtonsList>
    </Container>
  );
}

Home.navigationOptions = {
  title: 'Início',
};
