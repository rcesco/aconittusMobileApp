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
  FormInput,
  CheckIcon,
} from './styles';

const Guide = ({navigation}) => {
  const [guide, setGuide] = useState([]);
  const [search, setSearch] = useState('');
  function handleGuide(info) {
    navigation.navigate('ShowGuide', {info});
  }

  async function handleListing() {
    const response = await Api.get('/guide/listForApp');

    const {data} = response.data;

    setGuide(data);
  }

  const filteredGuide = guide
    ? guide.filter(item =>
        item.description.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  useEffect(() => {
    const focused = navigation.addListener('focus', () => {
      handleListing();
    });
    return focused;
  }, [navigation]);

  return (
    <Background>
      <FormInput
        placeholder="Pesquisar"
        value={search}
        onChangeText={setSearch}
      />
      <Container>
        <List
          data={filteredGuide}
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
                {item.signatures > 0 ? (
                  <CheckIcon>
                    <Icon name="check" color="#FFF" size={20} />
                  </CheckIcon>
                ) : (
                  <Name />
                )}
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
