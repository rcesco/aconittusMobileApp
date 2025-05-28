import React, {useState, useEffect, useRef} from 'react';
import {View, Alert, Modal, FlatList, Text} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Api from '../../../services/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
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
  PersonContainer,
  PersonName,
  ButtonSelectPerson,
  ButtonSelectPersonIcon,
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
} from './styles';

export default function PersonAssessmentView({route, navigation}) {
  const idPersonAssessment =
    route.params.personAssessmentItem.idperson_assessment;
  const typePersonAssessment = route.params.personAssessmentItem.type;

  const [rowsPerson, setRowsPerson] = useState([]);
  const [rowsPersonTmp, setRowsPersonTmp] = useState([]);
  const [personName, setPersonName] = useState('');
  const [personId, setPersonId] = useState('');
  const [questions, setQuestions] = useState([]);

  const [disableForm, setDisableForm] = useState(false);
  const [responses, setResponses] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [dates, setDates] = useState({});
  const [radioResponses, setRadioResponses] = useState({});

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
        `person_assessment_question/getByPersonAssessmentId/${idPersonAssessment}`,
        {
          id: idPersonAssessment,
        },
      );

      const initChoises = [];
      response.data.data.map(item => {
        initChoises.push({
          question: item.idperson_assessment_question,
          choise: item.type === 'date' ? null : 0,
          date: item.type === 'date' ? new Date() : -1,
          string: item.type === 'date' ? null : -999,
        });
      });

      setResponses(initChoises);
      setQuestions(response.data.data);
    } else {
      Alert.alert(
        'Você está sem internet! A lista de Avaliação pode estar desatualizada!',
      );
      const data = await AsyncStorage.getItem(
        `@PersonAssessmentView${idPersonAssessment}`,
      );
      JSON.parse(data);
    }
  }

  function selectPerson(item) {
    if (item.has_person_assessment_performed) {
      return Alert.alert(
        `A Avaliação para ${item.name} já está respondida, selecione outro colaborador.`,
      );
    }

    setPersonName(item.name);
    setPersonId(item.idperson);
    setModalVisible(false);
  }

  async function handleDataPerson() {
    try {
      if (typePersonAssessment === 'avaliacaopessoa') {
        const response = await Api.get(
          `person/getPersonByPersonAssessmentId/${idPersonAssessment}`,
          {
            id: idPersonAssessment,
          },
        );

        setRowsPerson(response.data.data);
        setRowsPersonTmp(response.data.data);
      }
    } catch (error) {
      console.log('erro: ' + error);
      throw Alert.alert(`Erro: ${error}`);
    }
  }

  useEffect(() => {
    const focused = navigation.addListener('focus', () => {
      handleDataPerson();
      initQuestions();
    });
    return focused;
  });

  async function handleResponses(response, date, string, id) {
    const index = questions.findIndex(
      q => q.idperson_assessment_question === id,
    );
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

  async function handlePostResponses() {
    if (!disableForm) {
      setDisableForm(true);

      let postParams = {};
      if (typePersonAssessment === 'avaliacaopessoa') {
        postParams = {
          idperson_assessment: idPersonAssessment,
          responses,
          idperson: personId,
        };
      } else {
        postParams = {
          idperson_assessment: idPersonAssessment,
          responses,
          idperson: null,
        };
      }

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

      if (typePersonAssessment === 'avaliacaopessoa' && personId === '') {
        Alert.alert('Você precisa selecionar o Colaborador');
        setDisableForm(false);
        return;
      }

      if (fullResponse) {
        try {
          const response = await Api.post(
            '/person_assessment/postResponsesApp',
            postParams,
          );

          if (response.status === 200) {
            Alert.alert('', 'Obrigado por Realizar esta Avaliação!', [
              {text: 'OK'},
            ]);
            navigation.navigate('PersonAssessmentList');
            setDisableForm(false);
          }
        } catch (error) {
          Alert.alert(
            'Ocorreu um Erro ao enviar a Avaliação reporte ao Administrador!',
          );
          setDisableForm(false);
        }
      } else {
        Alert.alert('Você Precisa responder Todas as Questões');
        setDisableForm(false);
      }
    } else {
      Alert.alert('Aguarde... Sua avaliação está sendo enviada');
    }
  }

  async function changePerson(filterq) {
    const personTest = rowsPersonTmp.filter(
      e =>
        e.name
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
    setRowsPerson(personTest);
  }

  const showDatepicker = questionId => {
    setShowDatePicker(prevState => ({
      ...prevState,
      [questionId]: true,
    }));
  };

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
    isQuestionAnswered(q.idperson_assessment_question, q.type),
  ).length;

  return (
    <Background>
      <Container>
        {typePersonAssessment === 'avaliacaopessoa' ? (
          <>
            <FormInput value={personName} editable={false} />
            <ModalButtonSelect onPress={() => setModalVisible(true)}>
              <ModalButtonText>Selecionar Colaborador</ModalButtonText>
            </ModalButtonSelect>
          </>
        ) : null}

        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
            {answeredCount}/{questions.length} questões respondidas
          </Text>
        </View>

        <View style={{flex: 1}}>
          {questions.length > 0 && (
            <QuestionContainer
              isCurrent={true}
              isAnswered={isQuestionAnswered(
                questions[currentQuestionIndex].idperson_assessment_question,
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
                          questions[currentQuestionIndex]
                            .idperson_assessment_question,
                        )
                      }
                      value={
                        radioResponses[
                          questions[currentQuestionIndex]
                            .idperson_assessment_question
                        ] || null
                      }>
                      {questions[currentQuestionIndex].answers.map(i => (
                        <RadioContainer
                          key={i.idperson_assessment_answer}
                          onPress={() =>
                            handleResponses(
                              i.idperson_assessment_answer,
                              null,
                              null,
                              questions[currentQuestionIndex]
                                .idperson_assessment_question,
                            )
                          }>
                          <StyledRadioButton
                            value={i.idperson_assessment_answer}>
                            <InnerCircle />
                          </StyledRadioButton>
                          <RadioText>{i.description}</RadioText>
                        </RadioContainer>
                      ))}
                    </RadioButton.Group>

                    <FormInput
                      key={currentQuestionIndex}
                      autoCorrect={true}
                      placeholder="Comente a sua resposta"
                      onChangeText={e =>
                        handleResponses(
                          -1,
                          null,
                          e,
                          questions[currentQuestionIndex]
                            .idperson_assessment_question,
                        )
                      }
                      value={
                        textResponses[
                          questions[currentQuestionIndex]
                            .idperson_assessment_question
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
                          questions[currentQuestionIndex]
                            .idperson_assessment_question
                        ]?.toLocaleDateString() || ''
                      }
                      placeholder="Não Selecionado Data"
                      editable={false}
                    />
                    <SelectData
                      title="Selecionar Data"
                      onPress={() =>
                        showDatepicker(
                          questions[currentQuestionIndex]
                            .idperson_assessment_question,
                        )
                      }>
                      Selecionar Data
                    </SelectData>
                    {showDatePicker[
                      questions[currentQuestionIndex]
                        .idperson_assessment_question
                    ] && (
                      <DateTimePicker
                        testID={
                          questions[currentQuestionIndex]
                            .idperson_assessment_question
                        }
                        value={
                          dates[
                            questions[currentQuestionIndex]
                              .idperson_assessment_question
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
                              .idperson_assessment_question,
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
                          questions[currentQuestionIndex]
                            .idperson_assessment_question
                        ]
                          ? dates[
                              questions[currentQuestionIndex]
                                .idperson_assessment_question
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
                          questions[currentQuestionIndex]
                            .idperson_assessment_question,
                        )
                      }>
                      Selecionar Hora
                    </SelectData>
                    {showDatePicker[
                      questions[currentQuestionIndex]
                        .idperson_assessment_question
                    ] && (
                      <DateTimePicker
                        testID={
                          questions[currentQuestionIndex]
                            .idperson_assessment_question
                        }
                        value={
                          dates[
                            questions[currentQuestionIndex]
                              .idperson_assessment_question
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
                              .idperson_assessment_question,
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
                        questions[currentQuestionIndex]
                          .idperson_assessment_question,
                      )
                    }
                    multiline={true}
                    value={
                      textResponses[
                        questions[currentQuestionIndex]
                          .idperson_assessment_question
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
        </View>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <ModalBody>
            <ModalButton onPress={() => setModalVisible(false)}>
              <ModalButtonText>Fechar</ModalButtonText>
            </ModalButton>
            <FormInput
              editable={true}
              onChangeText={e => changePerson(e)}
              placeholder="Pesquisar"
            />
            <FlatList
              data={rowsPerson}
              keyExtractor={comp => comp.idperson}
              renderItem={({item}) => (
                <PersonContainer
                  isAnswered={item.has_person_assessment_performed}>
                  <ButtonSelectPerson
                    isAnswered={item.has_person_assessment_performed}
                    onPress={() => selectPerson(item)}>
                    <ButtonSelectPersonIcon name="check" size={20} />
                  </ButtonSelectPerson>
                  <PersonName>
                    {item.has_person_assessment_performed
                      ? `${item.name} - Respondido`
                      : `${item.name} - Não respondido`}
                  </PersonName>
                </PersonContainer>
              )}
            />
          </ModalBody>
        </Modal>
      </Container>
    </Background>
  );
}

PersonAssessmentView.navigationOptions = {
  title: 'Respondendo Avaliação',
};
