import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Dimensions, View, Alert, Modal, Image} from 'react-native';
import Api from '../../services/api';
import Signature from 'react-native-signature-canvas';

import Pdf from 'react-native-pdf';

import {useNetInfo} from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';

const isIOS = DeviceInfo.getSystemName() === 'iOS';

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
} from './styles';

const ShowGuide = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const netInfo = useNetInfo();
  const [signature, setSignature] = useState(null);
  const [errorCanvas, setErrorCanvas] = useState(null);

  const refCanvas = useRef();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: isIOS ? 60 : 25,
    },
    melhoria: {marginTop: isIOS ? 60 : 25},
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
    uri: `${Api.defaults.baseURL}guide/viewfile/${route.params.info.file}`,
    cache: true,
    headers: customHeaders,
  };

  useEffect(() => {
    verifySignature();
  });

  const verifySignature = async () => {
    try {
      const response = await Api.post('/guide/verifySignature', {
        idGuide: route.params.info.idguide,
      });

      if (response.status === 200) {
        setModalVisible(false);
      } else {
        setModalVisible(true);
      }
    } catch (error) {
      Alert.alert(
        'Ocorreu um Erro ao validar o acesso a este manual reporte a Equipe Técnica!',
      );
      setModalVisible(false);
    }
  };

  const handleGuides = () => {
    navigation.navigate('Guide');
  };

  const handleClear = () => {
    setSignature(refCanvas.current.clearSignature());
  };

  const handleConfirm = () => {
    //console.tron.log(refCanvas.current.readSignature());
    setSignature(refCanvas.current.readSignature());
  };

  async function sendCanvas() {
    if (netInfo.isConnected) {
      if (signature != null) {
        try {
          const response = await Api.post('/guide/storeSignature', {
            image: signature,
            idGuide: route.params.info.idguide,
          });
          console.log(response);
          if (response.status === 200) {
            Alert.alert('Obrigado por Validar o acesso as Políticas!');
            setModalVisible(false);
          }
        } catch (error) {
          Alert.alert(
            'Ocorreu um Erro ao validar o acesso as Políticas Ipiranga reporte a Equipe Técnica!',
          );
          setModalVisible(false);
        }
      } else {
        Alert.alert(
          'Você Precisa assinar o Documento para enviar a confirmação!',
        );
        navigation.navigate('Guide');
      }
    } else {
      Alert.alert('Você está sem conexão com a Internet');
      setModalVisible(false);
    }
    //console.tron.log(signature);
  }

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ModalTerms style={styles.melhoria}>
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
            <ButtonClear onPress={() => handleGuides()}>
              <ButtonClearText>Voltar</ButtonClearText>
            </ButtonClear>
          </ButtonsContainer>
        </ModalTerms>
      </Modal>
      <ButtonClear onPress={() => handleGuides()}>
        <ButtonClearText>Voltar</ButtonClearText>
      </ButtonClear>
      <Pdf source={source} trustAllCerts={false} style={styles.pdf} />
    </View>
  );
};

export default ShowGuide;

ShowGuide.navigationOptions = {
  title: 'Manual / Política',
};
