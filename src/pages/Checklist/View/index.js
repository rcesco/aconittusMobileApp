import React, {useState, useEffect} from 'react';
import {
  View,
  Alert,
  Modal,
  Button,
  TextInput,
  PermissionsAndroid,
  Platform,
  Linking,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Api from '../../../services/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';

import {
  Container,
  Question,
  SubmitQuestions,
  List,
  ContainerQuestion,
  ModalButton,
  ModalButtonText,
  ModalBody,
  FormInput,
  CompositionContainer,
  CompositionName,
  ButtonSelectComposition,
  ButtonSelectCompositionIcon,
  ModalButtonSelect,
  Background,
  ResponseText,
} from './styles';

export default function Checklist({route, navigation}) {
  const [idChecklist, setIdChecklist] = useState('');
  const [questions, setQuestions] = useState([]);
  const [disableForm, setDisableForm] = useState(false);
  const [responses, setResponses] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [composition, setComposition] = useState([]);
  const [compositionName, setCompositionName] = useState([]);
  const [compositionsList, setCompositionsList] = useState([]);
  const [compositionListTmp, setCompositionsListTmp] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [dates, setDates] = useState({});
  const [radioResponses, setRadioResponses] = useState({});
  const [ip, setIp] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState({});

  async function initQuestions() {
    const netInfoState = await NetInfo.fetch();
    const isConnected = netInfoState.isConnected;
    if (isConnected) {
      const response = await Api.get(
        'checklist_question/appGetByChecklistId/' +
          route.params.checklist.idchecklist,
        {
          id: route.params.checklist.id,
        },
      );
      const initChoises = [];
      response.data.data.map(item => {
        initChoises.push({
          question: item.idchecklist_question,
          choise: item.type === 'date' ? null : 0,
          date: item.type === 'date' ? new Date() : -1,
          string: item.type === 'date' ? null : -999,
        });
      });

      setResponses(initChoises);
      setQuestions(response.data.data);
    } else {
      Alert.alert(
        'Você está sem internet a lista de Checklists pode estar desatualizada!',
      );
      const data = await AsyncStorage.getItem(
        `@ChecklistView${route.params.checklist.idchecklist}`,
      );
      JSON.parse(data);
    }
  }

  function selectComposition(id, name) {
    setCompositionName(name);
    setComposition(id);
    setModalVisible(false);
  }

  async function handleCompositions() {
    const response = await Api.get(
      '/vehicle_composition/get_by_dates/2023-08-11/2025-08-24',
    );

    const {data} = response.data;

    setCompositionsList(data);
    setCompositionsListTmp(data);
  }

  useEffect(() => {
    const focused = navigation.addListener('focus', () => {
      setIdChecklist(route.params.checklist.idchecklist);
      initQuestions();
      handleCompositions();
    });
    return focused;
  });

  async function handleResponses(response, date, string, id) {
    if (date !== null) {
      setDates(prevDates => ({...prevDates, [id]: date}));
    }

    if (response !== null && response !== -1) {
      setRadioResponses(prevRadioResponses => ({
        ...prevRadioResponses,
        [id]: response,
      }));
    }

    responses.forEach(function (value, index, arr) {
      if (arr[index].question === id) {
        if (response !== -1) {
          responses[index].choise = response;
        }
        responses[index].date = date;
        responses[index].string = string;
      }
    });

    setShowDatePicker(prevState => ({
      ...prevState,
      [id]: false,
    }));
  }

  const checkLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (!granted) {
        requestLocationPermission();
      } else {
        getCurrentLocation();
      }
    } else {
      // No iOS, solicitamos a permissão diretamente usando o próprio Geolocation
      Geolocation.requestAuthorization();
      getCurrentLocation();
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permissão para acessar localização',
            message: 'O aplicativo precisa acessar sua localização',
            buttonNeutral: 'Perguntar depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          showPermissionAlert();
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      // No iOS, a permissão é solicitada automaticamente pela Geolocation API.
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        console.error(error);
        if (Platform.OS === 'ios' && error.code === 1) {
          showPermissionAlert();
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  const showPermissionAlert = () => {
    Alert.alert(
      'Permissão de Localização',
      'As permissões de localização estão desativadas. Deseja abrir as configurações para ativá-las?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'Abrir Configurações', onPress: () => Linking.openSettings()},
      ],
    );
  };

  async function handlePostResponses() {
    if (!disableForm) {
      setDisableForm(true);

      const postParams = {
        idChecklist,
        responses,
        latitude,
        longitude,
        composition,
      };

      let fullResponse = true;

      responses.map(item => {
        if (item.choise === 0) {
          fullResponse = false;
        }
        if (item.string === -999) {
          fullResponse = false;
        }
        return true;
      });

      if (fullResponse) {
        try {
          const response = await Api.post(
            '/checklist/postResponsesApp',
            postParams,
          );

          if (response.status === 200) {
            Alert.alert('', 'Obrigado por Realizar este Checklist!', [
              {text: 'OK'},
            ]);
            navigation.navigate('ChecklistList');
            setDisableForm(false);
          }
        } catch (error) {
          Alert.alert(
            'Ocorreu um Erro ao enviar o Checklist reporte ao Administrador!',
          );
          setDisableForm(false);
        }
      } else {
        Alert.alert('Você Precisa responder Todas as Questões');
        setDisableForm(false);
      }
    } else {
      Alert.alert('Aguarde Seu checklist está sendo enviado');
    }
  }

  async function changeComposition(filterq) {
    const compositionTest = compositionListTmp.filter(
      e =>
        e.vehicle_id
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos
          .indexOf(
            filterq
              .trim()
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''), // Remove diacríticos do termo de busca
          ) !== -1, // Verifica se o termo de busca está contido em vehicle_id
    );

    compositionTest.length >= 1
      ? setCompositionsListTmp(compositionTest)
      : setCompositionsListTmp(compositionsList);
  }

  const showDatepicker = questionId => {
    setShowDatePicker(prevState => ({
      ...prevState,
      [questionId]: true,
    }));
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <Background>
      <Container>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <ModalBody>
            <ModalButton onPress={() => setModalVisible(false)}>
              <ModalButtonText>Fechar</ModalButtonText>
            </ModalButton>
            <FormInput
              editable={true}
              onChangeText={e => changeComposition(e)}
              placeholder="Pesquisar"
            />
            <List
              data={compositionListTmp}
              keyExtractor={comp => comp.idvehicle_composition}
              renderItem={({item}) => (
                <CompositionContainer>
                  <CompositionName>{`${
                    item.vehicle_id !== null ? item.vehicle_id : ''
                  } ${
                    item.vehicle_cart_id !== null ? item.vehicle_cart_id : ''
                  } ${
                    item.vehicle_cart2_id !== null ? item.vehicle_cart2_id : ''
                  } ${
                    item.vehicle_cart3_id !== null ? item.vehicle_cart3_id : ''
                  }`}</CompositionName>
                  <ButtonSelectComposition
                    onPress={() =>
                      selectComposition(
                        item.idvehicle_composition,
                        `${item.vehicle_id !== null ? item.vehicle_id : ''} ${
                          item.vehicle_cart_id !== null
                            ? item.vehicle_cart_id
                            : ''
                        } ${
                          item.vehicle_cart2_id !== null
                            ? item.vehicle_cart2_id
                            : ''
                        } ${
                          item.vehicle_cart3_id !== null
                            ? item.vehicle_cart3_id
                            : ''
                        }`,
                      )
                    }>
                    <ButtonSelectCompositionIcon name="check" size={20} />
                  </ButtonSelectComposition>
                </CompositionContainer>
              )}
            />
          </ModalBody>
        </Modal>
        <FormInput value={compositionName} editable={false} />
        <ModalButtonSelect onPress={() => setModalVisible(true)}>
          <ModalButtonText>Selecionar Composição</ModalButtonText>
        </ModalButtonSelect>
        <List
          data={questions}
          initialNumToRender={10}
          keyExtractor={question => question.idchecklist_question}
          renderItem={({item}) => (
            <ContainerQuestion>
              <Question>{item.description}</Question>
              {item.type === 'radio' ? (
                <RadioButton.Group
                  onValueChange={value =>
                    handleResponses(
                      value,
                      null,
                      null,
                      item.idchecklist_question,
                    )
                  }
                  value={radioResponses[item.idchecklist_question] || null}>
                  {item.answers.map(i => (
                    <View key={i.value}>
                      <ResponseText>{i.label}</ResponseText>
                      <RadioButton value={i.value} />
                    </View>
                  ))}
                </RadioButton.Group>
              ) : null}
              {item.type === 'radio' ? (
                <FormInput
                  autoCorrect={true}
                  placeholder="Detalhe o Problema"
                  onChangeText={e =>
                    handleResponses(-1, null, e, item.idchecklist_question)
                  }
                />
              ) : null}
              {item.type === 'date' ? (
                <View>
                  <TextInput
                    style={{borderWidth: 1, padding: 10, marginVertical: 10}}
                    value={
                      dates[item.idchecklist_question]?.toLocaleDateString() ||
                      ''
                    }
                    placeholder="Não Selecionado Data"
                    editable={false}
                  />
                  <Button
                    title="Selecionar Data"
                    onPress={() => showDatepicker(item.idchecklist_question)}
                  />
                  {showDatePicker[item.idchecklist_question] && (
                    <DateTimePicker
                      testID={item.idchecklist_question}
                      value={dates[item.idchecklist_question] || new Date()}
                      mode="date"
                      display="default"
                      onChange={(e, selectedDate) =>
                        handleResponses(
                          null,
                          selectedDate,
                          null,
                          item.idchecklist_question,
                        )
                      }
                    />
                  )}
                </View>
              ) : null}
              {item.type === 'hour' ? (
                <View>
                  <TextInput
                    style={{borderWidth: 1, padding: 10, marginVertical: 10}}
                    value={
                      dates[item.idchecklist_question]
                        ? dates[item.idchecklist_question].toLocaleTimeString(
                            [],
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                            },
                          )
                        : ''
                    }
                    placeholder="Não Selecionado Hora"
                    editable={false}
                  />
                  <Button
                    title="Selecionar Hora"
                    onPress={() => showDatepicker(item.idchecklist_question)}
                  />
                  {showDatePicker[item.idchecklist_question] && (
                    <DateTimePicker
                      testID={item.idchecklist_question}
                      value={dates[item.idchecklist_question] || new Date()}
                      mode="time"
                      display="default"
                      onChange={(e, selectedDate) =>
                        handleResponses(
                          null,
                          selectedDate,
                          null,
                          item.idchecklist_question,
                        )
                      }
                    />
                  )}
                </View>
              ) : null}
              {item.type === 'string' ? (
                <FormInput
                  autoCorrect={true}
                  placeholder="Escreva Sua Resposta"
                  onChangeText={e =>
                    handleResponses(null, null, e, item.idchecklist_question)
                  }
                />
              ) : null}
            </ContainerQuestion>
          )}
        />
        <SubmitQuestions
          onPress={() => {
            handlePostResponses();
          }}
          loading={disableForm}>
          Enviar Respostas
        </SubmitQuestions>
      </Container>
    </Background>
  );
}

Checklist.navigationOptions = {
  title: 'Respondendo Checklist',
};
