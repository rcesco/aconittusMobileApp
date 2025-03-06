import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Api from '../../../services/api';
import {format, parseISO} from 'date-fns';
import {ptBR} from 'date-fns/locale';

import {
  Container,
  List,
  Dss,
  Name,
  Date,
  Description,
  TopInfo,
  DescInfo,
  DssIcon,
  Infos,
  CheckIcon,
  Background,
} from './styles';

export default function DssList({navigation}) {
  const [dsss, setDss] = useState('');

  function handleDss(dss) {
    navigation.navigate('Dss', {dss});
  }

  async function handleListing() {
    const response = await Api.get('/dss/listForApp');

    const {data} = response.data;

    setDss(data);
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
          data={dsss}
          keyExtractor={dss => dss.name}
          renderItem={({item}) => (
            <Dss
              onPress={() => handleDss(item)}
              style={{backgroundColor: item.seen ? '#FFF' : '#FFF'}}>
              <TopInfo>
                <DssIcon>
                  <Icon name="video-camera" size={30} color="#FFF" />
                </DssIcon>
                <Infos>
                  <Name>{item.name}</Name>
                  <Date>
                    Data de Lançamento:
                    {format(parseISO(item.release_date), 'dd/MM/yyyy', {
                      locale: ptBR,
                    })}
                  </Date>
                </Infos>
                {item.seen > 0 ? (
                  <CheckIcon>
                    <Icon name="check" color="#FFF" size={20} />
                  </CheckIcon>
                ) : (
                  <Name />
                )}
              </TopInfo>
              <DescInfo>
                <Description>{item.description}</Description>
              </DescInfo>
            </Dss>
          )}
        />
      </Container>
    </Background>
  );
}

DssList.navigationOptions = {
  title: 'DSS',
};
