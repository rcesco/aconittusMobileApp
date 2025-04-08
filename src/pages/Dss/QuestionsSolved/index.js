import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import {useNetInfo} from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Api from '../../../services/api';

import {
  Container,
  Question,
  SubmitQuestions,
  List,
  ContainerQuestion,
  Background,
  QuestionAnswer,
} from './styles';

export default function QuestionsSolved({route, navigation}) {
  const [idDss, setIdDss] = useState('');
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const netInfo = useNetInfo();

  async function initQuestions() {
    const response = await Api.get(
      '/dss_question/getByDssIdAppSolved/' + route.params.iddss,
      {
        id: route.params.iddss,
      },
    );
    console.log(response.data.data);
    const initChoises = [];
    response.data.data.map(item =>
      initChoises.push({question: item.iddss_question, choise: 0}),
    );

    setResponses(initChoises);
    setQuestions(response.data.data);
  }

  useEffect(() => {
    const focused = navigation.addListener('focus', () => {
      setIdDss(route.params.iddss);
      initQuestions();
    });
    return focused;
  });

  function handleResponses(response, id) {
    responses.forEach(function (value, index, arr) {
      if (arr[index].question === id) {
        responses[index].choise = response;
      }
    });
  }

  function handleSucess() {
    navigation.navigate('Home');
  }

  async function handlePostResponses() {
    navigation.navigate('DssList');
  }

  return (
    <Background>
      <Container>
        <List
          data={questions}
          keyExtractor={question => question.iddss_question}
          renderItem={({item}) => {
            return (
              <ContainerQuestion>
                <Question>{item.question}</Question>
                {item.answers.map((answer, index) => {
                  const solvedValue = Number(answer.solved); // Convertendo solved para número

                  const backgroundColor =
                    solvedValue > 0 && answer.correct
                      ? '#02b1a0'
                      : solvedValue > 0 && !answer.correct
                      ? '#E94560'
                      : solvedValue === 0 && answer.correct
                      ? '#02b1a0'
                      : 'transparent';
                  return (
                    <QuestionAnswer
                      key={index}
                      style={{
                        backgroundColor,
                        padding: 10,
                        borderRadius: 5,
                        marginVertical: 5,
                      }}>
                      {answer.label}
                      {solvedValue > 0 && (
                        <Icon
                          name="check"
                          size={20}
                          color="white"
                          style={{marginLeft: 8}}
                        />
                      )}
                    </QuestionAnswer>
                  );
                })}
              </ContainerQuestion>
            );
          }}
        />
        <SubmitQuestions
          onPress={() => {
            handlePostResponses();
          }}>
          Voltar
        </SubmitQuestions>
      </Container>
    </Background>
  );
}

QuestionsSolved.navigationOptions = {
  title: 'Respondendo Questões',
};
