import React, {useState, useEffect} from 'react';
import {Alert, Image} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import {useNetInfo} from '@react-native-community/netinfo';
import * as ImagePicker from 'react-native-image-picker';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

import Api from '../../../services/api';

import {
  Background,
  Container,
  Question,
  SubmitQuestions,
  List,
  ContainerQuestion,
  ButtonModal,
  ButtonModalText,
} from './styles';

export default function Questions({route, navigation}) {
  const [idDss, setIdDss] = useState('');
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [photo, setPhoto] = useState(null);
  const netInfo = useNetInfo();

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      setIdDss(route.params.iddss);
      initQuestions();
    });
    return focus;
  }, [navigation]);

  async function initQuestions() {
    const response = await Api.get(
      '/dss_question/getByDssIdApp/' + route.params.iddss,
    );

    const initChoises = response.data.data.map(item => ({
      question: item.iddss_question,
      choise: 0,
    }));

    setResponses(initChoises);
    setQuestions(response.data.data);
  }

  function handleResponses(response, id) {
    const updated = responses.map(r =>
      r.question === id ? {...r, choise: response} : r,
    );
    setResponses(updated);
  }

  function handleSucess() {
    navigation.navigate('Home');
  }

  async function takePhoto() {
    const result = await check(PERMISSIONS.IOS.CAMERA);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        Alert.alert('Erro', 'A câmera não está disponível neste dispositivo.');
        break;
      case RESULTS.DENIED:
        const permission = await request(PERMISSIONS.IOS.CAMERA);
        if (permission === RESULTS.GRANTED) {
          launchCameraWithPicker();
        } else {
          Alert.alert('Permissão necessária para usar a câmera.');
        }
        break;
      case RESULTS.GRANTED:
        launchCameraWithPicker();
        break;
      case RESULTS.BLOCKED:
        Alert.alert(
          'Permissão de Câmera Bloqueada',
          'Você bloqueou o acesso à câmera. Vá até os Ajustes para ativar.',
          [
            {text: 'Cancelar', style: 'cancel'},
            {
              text: 'Abrir Ajustes',
              onPress: () => openSettings(),
            },
          ],
        );
        break;
    }
  }

  function launchCameraWithPicker() {
    const options = {
      title: 'Tirar Foto de Identificação',
      saveToPhotos: false,
      cameraType: 'front',
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 800,
      maxWidth: 800,
      quality: 1,
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        Alert.alert('Você precisa tirar a foto para iniciar o DSS');
        return;
      }

      if (response.errorCode) {
        Alert.alert(
          'Erro ao acessar câmera',
          response.errorMessage || 'Erro desconhecido',
        );
        return;
      }

      if (response.assets && response.assets[0]) {
        const img = response.assets[0];
        const image = {
          base64: `data:image/jpeg;base64,${img.base64}`,
          uri: img.uri,
          type: img.type,
          name: img.fileName || `foto_${Date.now()}.jpg`,
        };
        setPhoto(image);
      } else {
        Alert.alert('Erro ao capturar imagem. Tente novamente.');
      }
    });
  }

  async function handlePostResponses() {
    if (!photo) {
      Alert.alert('Você deve tirar uma foto antes de enviar!');
      return;
    }

    const allAnswered = responses.every(item => item.choise !== 0);
    if (!allAnswered) {
      Alert.alert(
        'Atenção',
        'Você precisa responder todas as perguntas antes de enviar.',
      );
      return;
    }

    if (!netInfo.isConnected) {
      Alert.alert('Você está sem conexão com a internet.');
      return;
    }

    let correctAnswers = 0;

    responses.forEach(item => {
      const question = questions.find(q => q.iddss_question === item.question);
      if (question) {
        const selected = question.answers.find(
          ans => ans.value === item.choise,
        );
        if (selected?.correct) correctAnswers++;
      }
    });

    const percentage = ((correctAnswers / questions.length) * 100).toFixed(2);

    try {
      const payload = {
        idDss,
        responses,
        photo: photo.base64, // Envio como base64
      };

      const response = await Api.post('/dss/postResponsesApp', payload);

      if (response.status === 200) {
        const msg =
          percentage >= route.params.percent
            ? `Obrigado por participar do DSS!\n\nAcertos: ${percentage}%`
            : `Você não atingiu a pontuação mínima.\n\nAcertos: ${percentage}%`;

        Alert.alert('Resultado', msg, [{text: 'OK', onPress: handleSucess}]);
      }
    } catch (err) {
      Alert.alert('Erro', 'Falha ao enviar as respostas. Tente novamente.');
    }
  }

  if (!photo) {
    return (
      <Background>
        <Container>
          <ButtonModal onPress={takePhoto}>
            <ButtonModalText>Tirar Foto para Iniciar</ButtonModalText>
          </ButtonModal>
        </Container>
      </Background>
    );
  }

  return (
    <Background>
      <Container>
        <Image
          source={{uri: photo.uri}}
          style={{
            width: 180,
            height: 180,
            borderRadius: 90,
            alignSelf: 'center',
            marginBottom: 20,
          }}
        />

        <List
          data={questions}
          keyExtractor={item => String(item.iddss_question)}
          renderItem={({item}) => (
            <ContainerQuestion>
              <Question>{item.question}</Question>
              <RadioForm
                radio_props={item.answers}
                initial={-1}
                onPress={value => handleResponses(value, item.iddss_question)}
                labelStyle={{fontSize: 18, color: '#FFF'}}
                selectedButtonColor="#d3de32"
              />
            </ContainerQuestion>
          )}
        />

        <SubmitQuestions onPress={handlePostResponses}>
          Enviar Respostas
        </SubmitQuestions>
      </Container>
    </Background>
  );
}

Questions.navigationOptions = {
  title: 'Respondendo Questões',
};
