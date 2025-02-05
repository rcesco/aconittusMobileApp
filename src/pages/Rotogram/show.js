import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Dimensions, View, Alert, Modal, Image} from 'react-native';
import Api from '../../services/api';

import Pdf from 'react-native-pdf';
import Signature from 'react-native-signature-canvas';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  Container,
  ModalTerms,
  ModalHeader,
  ModalText,
  ButtonClear,
  ButtonClearText,
  ButtonClearIcon,
  ButtonsContainer,
  ModalCanvas,
  ModalSignature,
  SignatureButtonsContainer,
  ButtonSignature,
  FormInputSugest,
} from './styles';
import {ModalContainer} from '../Dss/Questions/styles';
// import { Container } from './styles';

const ShowRotogram = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const netInfo = useNetInfo();
  const [signature, setSignature] = useState(null);
  const [errorCanvas, setErrorCanvas] = useState(null);
  const [newSugest, setNewSugest] = useState('');
  const [modalSugestVisible, setModalSugestVisible] = useState(false);
  //console.tron.log(Api.defaults.headers.Authorization);

  const refCanvas = useRef();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
    },
    pdf: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    previewImage: {
      height: 250,
      resizeMode: 'stretch',
    },
  });

  const customHeaders = {
    Authorization: `${Api.defaults.headers.Authorization}`,
    person: `${Api.defaults.headers.person}`,
  };

  const source = {
    uri: `${Api.defaults.baseURL}rotogram/viewfile/${route.params.info.file}`,
    cache: false,
    headers: customHeaders,
  };

  useEffect(() => {
    verifySignature();
  });

  const verifySignature = async () => {
    try {
      const response = await Api.post('/rotogram/verifySignature', {
        idRotogram: route.params.info.idrotogram,
      });

      if (response.status === 200) {
        setModalVisible(false);
      } else {
        setModalVisible(true);
      }
    } catch (error) {
      Alert.alert(
        'Ocorreu um Erro ao validar o acesso a este rotograma reporte a Equipe Técnica!',
      );
      setModalVisible(false);
    }
  };

  const handleRotogram = () => {
    navigation.navigate('Rotogram');
  };

  const handleClear = () => {
    setSignature(refCanvas.current.clearSignature());
  };

  const handleConfirm = () => {
    setSignature(refCanvas.current.readSignature());
  };

  async function sendCanvas() {
    if (netInfo.isConnected) {
      if (signature != null) {
        try {
          const response = await Api.post('/rotogram/storeSignature', {
            image: signature,
            idRotogram: route.params.info.idrotogram,
          });
          if (response.status === 200) {
            Alert.alert('Obrigado por Validar o acesso ao Rotograma!');
            setModalVisible(false);
          }
        } catch (error) {
          Alert.alert(
            'Ocorreu um Erro ao validar o acesso a este manual reporte a Equipe Técnica!',
          );
          setModalVisible(false);
        }
      } else {
        Alert.alert(
          'Você Precisa assinar o Documento para enviar a confirmação!',
        );
        navigation.navigate('Rotogram');
      }
    } else {
      Alert.alert('Você está sem conexão com a Internet');
      setModalVisible(false);
    }
    //console.tron.log(signature);
  }

  async function handleModalSugest() {
    setModalSugestVisible(!modalSugestVisible);
  }

  async function handleSendSugest() {
    try {
      const response = await Api.post('/rotogram/storeSugest', {
        idRotogram: route.params.info.idrotogram,
        newSugest,
      });
      if (response.status === 200) {
        Alert.alert('Obrigado por enviar sua sugestão ao Rotograma!');
        setModalSugestVisible(false);
      }
    } catch (error) {
      Alert.alert('Ocorreu um Erro ao Enviar Sua Sugestão!');
    }
  }

  async function handleParticipation() {
    try {
      const response = await Api.post('/rotogram_view', {
        idInformative: route.params.info.idrotogram,
      });
      //console.tron.log(response);
    } catch (error) {
      Alert.alert(
        'Ocorreu um Erro ao enviar o Checklist reporte ao Administrador!',
      );
    }
  }

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ModalTerms>
          <ModalHeader>
            Termo de Recebimento do {route.params.info.description}
          </ModalHeader>
          <ModalText>
            Declaro para os devidos fins que recebi o $
            {route.params.info.description}
            Disponibilizado através do APP.
          </ModalText>
          <ModalHeader>Assinatura</ModalHeader>
          <ModalCanvas>
            <Signature
              ref={refCanvas}
              autoClear={true}
              descriptionText={''}
              imageType={'image/png+xml'}
              onOK={setSignature}
              confirmText={'Assinar'}
              clearText={'Limpar'}
              onClear={() => setSignature(null)}
            />
          </ModalCanvas>
          <SignatureButtonsContainer>
            <ButtonSignature onPress={handleClear}>
              <ButtonClearText>Limpar</ButtonClearText>
            </ButtonSignature>
            <ButtonSignature onPress={handleConfirm}>
              <ButtonClearText>Assinar</ButtonClearText>
            </ButtonSignature>
          </SignatureButtonsContainer>
          <ModalSignature>
            <Image style={styles.previewImage} source={{uri: signature}} />
          </ModalSignature>
          <ButtonsContainer>
            <ButtonClear onPress={() => sendCanvas()}>
              <ButtonClearText>Enviar Confirmação</ButtonClearText>
            </ButtonClear>
            <ButtonClear onPress={() => handleRotogram()}>
              <ButtonClearText>Voltar</ButtonClearText>
            </ButtonClear>
          </ButtonsContainer>
        </ModalTerms>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSugestVisible}>
        <ModalTerms>
          <ModalHeader>
            Informar Melhoria do Rotograma {route.params.info.description}
          </ModalHeader>
          <ModalContainer>
            <FormInputSugest onChangeText={setNewSugest} />
          </ModalContainer>
          <ButtonsContainer>
            <ButtonClear onPress={() => handleSendSugest()}>
              <ButtonClearText>Enviar Confirmação</ButtonClearText>
            </ButtonClear>
            <ButtonClear onPress={() => handleModalSugest()}>
              <ButtonClearText>Voltar</ButtonClearText>
            </ButtonClear>
          </ButtonsContainer>
        </ModalTerms>
      </Modal>
      <SignatureButtonsContainer>
        <ButtonSignature onPress={() => handleRotogram()}>
          <ButtonClearText>Voltar</ButtonClearText>
        </ButtonSignature>
        <ButtonSignature onPress={() => handleModalSugest()}>
          <ButtonClearText>Sugerir Melhoria</ButtonClearText>
        </ButtonSignature>
      </SignatureButtonsContainer>
      <Pdf source={source} trustAllCerts={false} style={styles.pdf} />
    </View>
  );
};

export default ShowRotogram;

ShowRotogram.navigationOptions = {
  title: 'Rotograma',
};
