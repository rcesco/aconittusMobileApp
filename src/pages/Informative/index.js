import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Api from '../../services/api';
import {format, parseISO} from 'date-fns';
import {ptBR} from 'date-fns/locale';

import {
  Container,
  List,
  InformativeContainer,
  TopInfo,
  Infos,
  Name,
  Date,
  InfoIcon,
  Background,
  FormInput,
  CheckIcon,
} from './styles';

const Informatives = ({navigation}) => {
  const [informative, setInformative] = useState([]);
  const [search, setSearch] = useState('');

  function handleInformative(info) {
    //console.tron.log(info);
    navigation.navigate('ShowInformative', {info});
  }

  async function handleListing() {
    const response = await Api.get('/informative/listForApp');

    const {data} = response.data;

    setInformative(data);
  }

  const filteredInformative = informative
    ? informative.filter(item =>
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
          data={filteredInformative}
          keyExtractor={info => info.title}
          renderItem={({item}) => (
            <InformativeContainer onPress={() => handleInformative(item)}>
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
            </InformativeContainer>
          )}
        />
      </Container>
    </Background>
  );
};

export default Informatives;

Informatives.navigationOptions = {
  title: 'Informativos',
};
