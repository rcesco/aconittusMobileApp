import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import {useNetInfo} from '@react-native-community/netinfo';

import Api from '../../../services/api';

import {
  Container,
  Question,
  SubmitQuestions,
  List,
  ContainerQuestion,
  Background,
} from './styles';

export default function Questions({route, navigation}) {
  const [idDss, setIdDss] = useState('');
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const netInfo = useNetInfo();

  async function initQuestions() {
    const response = await Api.get(
      '/dss_question/getByDssIdApp/' + route.params.iddss,
      {
        id: route.params.iddss,
      },
    );

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
    const postParams = {
      idDss,
      responses,
    };

    let fullResponse = true;
    let correctAnswers = 0;

    responses.forEach(item => {
      if (item.choise === 0) {
        fullResponse = false;
      } else {
        const question = questions.find(
          q => q.iddss_question === item.question,
        );
        if (question) {
          const selectedAnswer = question.answers.find(
            ans => ans.value === item.choise,
          );
          if (selectedAnswer && selectedAnswer.correct) {
            correctAnswers++;
          }
        }
      }
    });

    responses.map(item => {
      if (item.choise === 0) {
        fullResponse = false;
      }
      return true;
    });

    if (fullResponse) {
      if (netInfo.isConnected) {
        try {
          const totalQuestions = questions.length;
          const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(
            2,
          );
          if (percentage >= route.params.percent) {
            const response = await Api.post(
              '/dss/postResponsesApp',
              postParams,
            );

            if (response.status === 200) {
              Alert.alert(
                'Resultado',
                `Obrigado por participar do DSS desta Semana!\n\nSua pontuação: ${percentage}% de acerto`,
                [{text: 'OK', onPress: () => handleSucess()}],
              );
            }
          } else {
            Alert.alert(
              'Resultado',
              `Você Não Atingiu a Porcentagem Necessária, por favor assista novamente!\n\nSua pontuação: ${percentage}% de acerto`,
              [{text: 'OK', onPress: () => handleSucess()}],
            );
          }
        } catch (error) {
          Alert.alert(
            'Ocorreu um Erro ao enviar o DSS reporte ao Administrador!',
          );
        }
      } else {
        Alert.alert('Você está sem conexão com a Internet');
      }
    } else {
      Alert.alert(
        'Alerta!',
        'Você precisa selecionar pelo menos uma resposta para cada questão!',
        [{text: 'OK', style: 'cancel'}],
      );
    }
  }

  return (
    <Background>
      <Container>
        <List
          data={questions}
          keyExtractor={question => question.iddss_question}
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
        <SubmitQuestions
          onPress={() => {
            handlePostResponses();
          }}>
          Enviar Respostas
        </SubmitQuestions>
      </Container>
    </Background>
  );
}

Questions.navigationOptions = {
  title: 'Respondendo Questões',
};
