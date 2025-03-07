import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Api from '../../services/api';
import {format, parseISO} from 'date-fns';
import {ptBR} from 'date-fns/locale';

import {
  Container,
  List,
  RotogramContainer,
  TopInfo,
  Infos,
  Name,
  Date,
  InfoIcon,
  Question,
  FormInput,
  Background,
  CheckIcon,
} from './styles';

const Rotograms = ({navigation}) => {
  const [rotogram, setRotogram] = useState([]);
  const [search, setSearch] = useState('');

  function handleRotogram(info) {
    navigation.navigate('ShowRotogram', {info});
  }

  async function handleListing() {
    const response = await Api.get('/rotogram/listForApp');
    const {data} = response.data;
    setRotogram(data);
  }

  useEffect(() => {
    const focused = navigation.addListener('focus', () => {
      handleListing();
    });
    return focused;
  }, [navigation]);

  // Função para filtrar os rotogramas com base na pesquisa
  const filteredRotogram = rotogram
    ? rotogram.filter(item =>
        item.description.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  return (
    <Background>
      <Container>
        <FormInput
          placeholder="Pesquisar"
          value={search}
          onChangeText={setSearch}
        />
        <List
          data={filteredRotogram}
          keyExtractor={info => info.title}
          renderItem={({item}) => (
            <RotogramContainer onPress={() => handleRotogram(item)}>
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
            </RotogramContainer>
          )}
        />
      </Container>
    </Background>
  );
};

export default Rotograms;

Rotograms.navigationOptions = {
  title: 'Rotogramas',
};
