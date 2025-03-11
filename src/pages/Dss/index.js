import React, {useState, useEffect, useCallback} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import YoutubePlayer from 'react-native-youtube-iframe';

import {
  Container,
  DssName,
  Instructor,
  QuestionButton,
  Description,
  Background,
} from './styles';

export default function Dss({route, navigation}) {
  const [dss, setDss] = useState('');
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    setDss(route.params.dss);
  }, [route]);

  function handleQuestions(idDss) {
    navigation.navigate('Questions', idDss);
  }

  function handleQuestionsSolved(idDss) {
    navigation.navigate('QuestionsSolved', idDss);
  }

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <Background>
      <Container>
        <DssName>{dss.name}</DssName>
        <Instructor>
          <Icon name="user" size={15} />
          Instrutor: {dss.instructor}
        </Instructor>
        <Description>{dss.description}</Description>
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={dss.video}
          onChangeState={onStateChange}
        />
        {dss.seen > 0 ? (
          <QuestionButton style={{backgroundColor: '#02b1a0'}}>
            <Icon name="check" /> Questões já respondidas
          </QuestionButton>
        ) : (
          <QuestionButton onPress={() => handleQuestions(dss)}>
            Responder As Questões
          </QuestionButton>
        )}
        {dss.seen > 0 ? (
          <QuestionButton onPress={() => handleQuestionsSolved(dss)}>
            Ver Respostas
          </QuestionButton>
        ) : (
          ``
        )}
      </Container>
    </Background>
  );
}

Dss.navigationOptions = {
  title: 'Dss',
};
