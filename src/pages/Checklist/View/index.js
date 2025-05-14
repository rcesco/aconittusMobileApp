import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Alert,
  Modal,
  Button,
  FlatList,
  PermissionsAndroid,
  Platform,
  Linking,
  TouchableOpacity,
  Text,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Api from '../../../services/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {ActivityIndicator} from 'react-native';

import {
  Container,
  Question,
  SubmitQuestions,
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
  SubmitButtonText,
  SelectData,
  RadioContainer,
  RadioText,
  StyledRadioButton,
  InnerCircle,
  navigationContainer,
  NavButton,
  NavButtonText,
  StyledButton,
  StyledButtonText,
  QuestionContainer,
  ContainerAllQuestion,
} from './styles';

export default function Checklist({route, navigation}) {
  const [idChecklist, setIdChecklist] = useState('');
  const [questions, setQuestions] = useState([]);
  const [disableForm, setDisableForm] = useState(false);
  const [responses, setResponses] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [composition, setComposition] = useState('');
  const [categoryChecklist, setCategoryChecklist] = useState('composicao');
  const [compositionName, setCompositionName] = useState([]);
  const [compositionsList, setCompositionsList] = useState([]);
  const [compositionListTmp, setCompositionsListTmp] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [dates, setDates] = useState({});
  const [radioResponses, setRadioResponses] = useState({});
  const [ip, setIp] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState({});
  const isIOS = DeviceInfo.getSystemName() === 'iOS';

  const listRef = useRef(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [textResponses, setTextResponses] = useState({});

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

      setCategoryChecklist(route.params.checklist.category);

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
    try {
      start_date = moment().format('YYYY-MM-DD');
      end_date = moment().format('YYYY-MM-DD');
      const response = await Api.get(
        `/vehicle_composition/get_by_dates/${start_date}/${end_date}`,
      );

      const {data} = response.data;

      setCompositionsList(data);
      setCompositionsListTmp(data);
    } catch (error) {
      console.log('erro: ' + error);
      throw error;
    }
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
    const index = questions.findIndex(q => q.idchecklist_question === id);
    if (index !== -1) {
      setCurrentQuestionIndex(index);
    }

    if (date !== null) {
      setDates(prevDates => ({...prevDates, [id]: date}));
    }

    if (response !== null && response !== -1) {
      setRadioResponses(prevRadioResponses => ({
        ...prevRadioResponses,
        [id]: response,
      }));
    }

    if (typeof string === 'string') {
      setTextResponses(prev => ({...prev, [id]: string}));
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

      if (categoryChecklist === 'composicao' && composition === '') {
        Alert.alert('Você Precisa Selecionar a Composição');
        setDisableForm(false);
        return;
      }

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
        e.composition
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .indexOf(
            filterq
              .trim()
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''),
          ) !== -1,
    );
    setCompositionsList(compositionTest);
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

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      listRef.current?.scrollToIndex({
        index: currentQuestionIndex + 1,
        animated: true,
      });
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      listRef.current?.scrollToIndex({
        index: currentQuestionIndex - 1,
        animated: true,
      });
    }
  };

  const isQuestionAnswered = (questionId, questionType) => {
    if (questionType === 'radio') {
      const hasRadioSelection =
        radioResponses[questionId] !== undefined &&
        radioResponses[questionId] !== null;

      return hasRadioSelection;
    }

    if (questionType === 'date') {
      return dates[questionId] !== undefined && dates[questionId] !== null;
    }

    if (questionType === 'hour') {
      return dates[questionId] !== undefined && dates[questionId] !== null;
    }

    if (questionType === 'string') {
      return (
        textResponses[questionId] !== undefined &&
        textResponses[questionId]?.trim() !== ''
      );
    }

    return false;
  };

  const answeredCount = questions.filter(q =>
    isQuestionAnswered(q.idchecklist_question, q.type),
  ).length;

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
            <FlatList
              data={compositionsList}
              keyExtractor={comp => comp.idvehicle_composition}
              renderItem={({item}) => (
                <CompositionContainer>
                  <CompositionName>{item.composition}</CompositionName>
                  <ButtonSelectComposition
                    onPress={() =>
                      selectComposition(
                        item.idvehicle_composition,
                        item.composition,
                      )
                    }>
                    <ButtonSelectCompositionIcon name="check" size={20} />
                  </ButtonSelectComposition>
                </CompositionContainer>
              )}
            />
          </ModalBody>
        </Modal>
        {categoryChecklist === 'composicao' ? (
          <>
            <FormInput value={compositionName} editable={false} />
            <ModalButtonSelect onPress={() => setModalVisible(true)}>
              <ModalButtonText>Selecionar Composição</ModalButtonText>
            </ModalButtonSelect>
          </>
        ) : null}

        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
            {answeredCount}/{questions.length} questões respondidas
          </Text>
        </View>

        <ContainerAllQuestion>
          {questions.length > 0 && (
            <QuestionContainer
              isCurrent={true}
              isAnswered={isQuestionAnswered(
                questions[currentQuestionIndex].idchecklist_question,
                questions[currentQuestionIndex].type,
              )}>
              <ContainerQuestion>
                <Question>
                  {currentQuestionIndex + 1} -{' '}
                  {questions[currentQuestionIndex].description}
                </Question>

                {questions[currentQuestionIndex].type === 'radio' && (
                  <>
                    <RadioButton.Group
                      onValueChange={value =>
                        handleResponses(
                          value,
                          null,
                          null,
                          questions[currentQuestionIndex].idchecklist_question,
                        )
                      }
                      value={
                        radioResponses[
                          questions[currentQuestionIndex].idchecklist_question
                        ] || null
                      }>
                      {questions[currentQuestionIndex].answers.map(i => (
                        <RadioContainer
                          key={i.value}
                          onPress={() =>
                            handleResponses(
                              i.value,
                              null,
                              null,
                              questions[currentQuestionIndex]
                                .idchecklist_question,
                            )
                          }>
                          <StyledRadioButton value={i.value}>
                            <InnerCircle />
                          </StyledRadioButton>
                          <RadioText>{i.label}</RadioText>
                        </RadioContainer>
                      ))}
                    </RadioButton.Group>

                    <FormInput
                      key={currentQuestionIndex}
                      autoCorrect={true}
                      placeholder="Detalhe o Problema"
                      onChangeText={e =>
                        handleResponses(
                          -1,
                          null,
                          e,
                          questions[currentQuestionIndex].idchecklist_question,
                        )
                      }
                      value={
                        textResponses[
                          questions[currentQuestionIndex].idchecklist_question
                        ]
                      }
                      multiline={true}
                      numberOfLines={3}
                      textAlignVertical="top"
                    />
                  </>
                )}

                {questions[currentQuestionIndex].type === 'date' && (
                  <View>
                    <FormInput
                      value={
                        dates[
                          questions[currentQuestionIndex].idchecklist_question
                        ]?.toLocaleDateString() || ''
                      }
                      placeholder="Não Selecionado Data"
                      editable={false}
                    />
                    <SelectData
                      title="Selecionar Data"
                      onPress={() =>
                        showDatepicker(
                          questions[currentQuestionIndex].idchecklist_question,
                        )
                      }>
                      Selecionar Data
                    </SelectData>
                    {showDatePicker[
                      questions[currentQuestionIndex].idchecklist_question
                    ] && (
                      <DateTimePicker
                        testID={
                          questions[currentQuestionIndex].idchecklist_question
                        }
                        value={
                          dates[
                            questions[currentQuestionIndex].idchecklist_question
                          ] || new Date()
                        }
                        mode="date"
                        display={isIOS ? 'calendar' : 'default'}
                        onChange={(e, selectedDate) =>
                          handleResponses(
                            null,
                            selectedDate,
                            null,
                            questions[currentQuestionIndex]
                              .idchecklist_question,
                          )
                        }
                      />
                    )}
                  </View>
                )}

                {questions[currentQuestionIndex].type === 'hour' && (
                  <View>
                    <FormInput
                      value={
                        dates[
                          questions[currentQuestionIndex].idchecklist_question
                        ]
                          ? dates[
                              questions[currentQuestionIndex]
                                .idchecklist_question
                            ].toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : ''
                      }
                      placeholder="Não Selecionado Hora"
                      editable={false}
                    />
                    <SelectData
                      title="Selecionar Hora"
                      onPress={() =>
                        showDatepicker(
                          questions[currentQuestionIndex].idchecklist_question,
                        )
                      }>
                      Selecionar Hora
                    </SelectData>
                    {showDatePicker[
                      questions[currentQuestionIndex].idchecklist_question
                    ] && (
                      <DateTimePicker
                        testID={
                          questions[currentQuestionIndex].idchecklist_question
                        }
                        value={
                          dates[
                            questions[currentQuestionIndex].idchecklist_question
                          ] || new Date()
                        }
                        mode="time"
                        display="default"
                        onChange={(e, selectedDate) =>
                          handleResponses(
                            null,
                            selectedDate,
                            null,
                            questions[currentQuestionIndex]
                              .idchecklist_question,
                          )
                        }
                      />
                    )}
                  </View>
                )}

                {questions[currentQuestionIndex].type === 'string' && (
                  <FormInput
                    autoCorrect={true}
                    placeholder="Escreva Sua Resposta"
                    onChangeText={e =>
                      handleResponses(
                        null,
                        null,
                        e,
                        questions[currentQuestionIndex].idchecklist_question,
                      )
                    }
                    multiline={true}
                    value={
                      textResponses[
                        questions[currentQuestionIndex].idchecklist_question
                      ]
                    }
                  />
                )}

                <View
                  style={{
                    borderBottomColor: '#FFF',
                    borderBottomWidth: 0.6,
                    marginVertical: 10,
                  }}
                />
              </ContainerQuestion>
            </QuestionContainer>
          )}

          <View style={navigationContainer}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <StyledButton
                onPress={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                isDisabled={currentQuestionIndex === 0}>
                <Icon
                  name="caretleft"
                  size={20}
                  color={currentQuestionIndex === 0 ? '#adb5bd' : 'white'}
                />
                <StyledButtonText isDisabled={currentQuestionIndex === 0}>
                  Anterior
                </StyledButtonText>
              </StyledButton>

              <NavButton
                disabled={currentQuestionIndex === questions.length - 1}
                isDisabled={currentQuestionIndex === questions.length - 1}
                onPress={goToNextQuestion}
                activeOpacity={0.7}>
                <NavButtonText
                  isDisabled={currentQuestionIndex === questions.length - 1}>
                  Próxima
                </NavButtonText>
                <Icon
                  name="caretright"
                  size={20}
                  color={
                    currentQuestionIndex === questions.length - 1
                      ? '#adb5bd'
                      : 'white'
                  }
                />
              </NavButton>
            </View>
          </View>

          <View style={navigationContainer}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <SubmitQuestions
                onPress={handlePostResponses}
                disabled={answeredCount !== questions.length || disableForm}>
                {disableForm ? (
                  <>
                    <ActivityIndicator size="small" color="#fff" />
                    <SubmitButtonText>Enviando Respostas</SubmitButtonText>
                  </>
                ) : (
                  <>
                    <IconEntypo name="save" size={20} color="white" />
                    <SubmitButtonText>Enviar Respostas</SubmitButtonText>
                  </>
                )}
              </SubmitQuestions>
            </View>
          </View>
        </ContainerAllQuestion>
      </Container>
    </Background>
  );
}

Checklist.navigationOptions = {
  title: 'Respondendo Checklist',
};
