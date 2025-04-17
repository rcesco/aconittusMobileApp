import React, {useState, useEffect, useCallback} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import YoutubePlayer from 'react-native-youtube-iframe';
import {WebView} from 'react-native-webview';
import {View} from 'react-native';

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
  const [playing, setPlaying] = useState(false);
  const [webViewLayout, setWebViewLayout] = useState({width: 0, height: 0});

  useEffect(() => {
    setDss(route.params.dss);
  }, [route]);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  function handleQuestions(idDss) {
    navigation.navigate('Questions', idDss);
  }

  function handleQuestionsSolved(idDss) {
    navigation.navigate('QuestionsSolved', idDss);
  }

  return (
    <Background>
      <Container
        onLayout={event => {
          const {width} = event.nativeEvent.layout;
          const isPPT = route.params.dss.category === 'ppt';
          const height = isPPT ? width * 0.75 : width * 0.5625; // 4:3 para ppt, 16:9 para vídeo
          setWebViewLayout({width, height});
        }}>
        <DssName>{dss.name}</DssName>

        <Instructor>
          <Icon name="user" size={15} /> Instrutor: {dss.instructor}
        </Instructor>

        <Description>{dss.description}</Description>

        {dss.category === 'ppt' ? (
          <WebView
            originWhitelist={['*']}
            source={{
              uri: `${dss.video}`,
            }}
            style={{
              width: '100%',
              height: webViewLayout.height,
              alignSelf: 'center',
            }}
            javaScriptEnabled
            domStorageEnabled
            allowsFullscreenVideo
            startInLoadingState
            mediaPlaybackRequiresUserAction={false}
            mixedContentMode="always"
          />
        ) : (
          <YoutubePlayer
            height={webViewLayout.height || 300}
            width={'100%'}
            play={playing}
            videoId={dss.video}
            onChangeState={onStateChange}
          />
        )}

        {dss.seen > 0 ? (
          <QuestionButton style={{backgroundColor: '#02b1a0'}}>
            <Icon name="check" /> Questões já respondidas
          </QuestionButton>
        ) : (
          <QuestionButton onPress={() => handleQuestions(dss)}>
            Responder As Questões
          </QuestionButton>
        )}

        {dss.seen > 0 && (
          <QuestionButton onPress={() => handleQuestionsSolved(dss)}>
            Ver Respostas
          </QuestionButton>
        )}
      </Container>
    </Background>
  );
}

Dss.navigationOptions = {
  title: 'Dss',
};
