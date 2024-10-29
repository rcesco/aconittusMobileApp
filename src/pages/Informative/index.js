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
} from './styles';

const Informatives = ({navigation}) => {
  const [informative, setInformative] = useState([]);

  function handleInformative(info) {
    //console.tron.log(info);
    navigation.navigate('ShowInformative', {info});
  }

  async function handleListing() {
    const response = await Api.get('/informative');

    const {data} = response.data;

    setInformative(data);
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
          data={informative}
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
