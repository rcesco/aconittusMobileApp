import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Api from '../../services/api';
import {format, parseISO} from 'date-fns';
import {ptBR} from 'date-fns/locale';

import {
  Container,
  List,
  GuideContainer,
  TopInfo,
  Infos,
  Name,
  Date,
  InfoIcon,
  Background,
} from './styles';

const Guide = ({navigation}) => {
  const [guide, setGuide] = useState([]);

  function handleGuide(info) {
    navigation.navigate('ShowGuide', {info});
  }

  async function handleListing() {
    const response = await Api.get('/guide/listForApp');

    const {data} = response.data;

    setGuide(data);
  }

  useEffect(() => {
    const focused = navigation.addListener('focus', () => {
      handleListing();
    });
    return focused;
  }, [navigation]);

  return (
    <Background>
      <Container>
        <List
          data={guide}
          keyExtractor={info => info.title}
          renderItem={({item}) => (
            <GuideContainer onPress={() => handleGuide(item)}>
              <TopInfo>
                <InfoIcon>
                  <Icon name="file-o" size={30} color="#FFF" />
                </InfoIcon>
                <Infos>
                  <Name>{item.description}</Name>
                  <Date>
                    {format(parseISO(item.date), 'dd/MM/yyyy', {
                      locale: ptBR,
                    })}
                  </Date>
                </Infos>
              </TopInfo>
            </GuideContainer>
          )}
        />
      </Container>
    </Background>
  );
};

export default Guide;

Guide.navigationOptions = {
  title: 'Manuais e Políticas',
};
