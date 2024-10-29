import React, {useState, useEffect} from 'react';
import Api from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import {
  Container,
  List,
  ChecklistButton,
  TopInfo,
  ChecklistIcon,
  Infos,
  Name,
  FormInput,
} from './styles';
import {Alert} from 'react-native';

export default function ChecklistList({navigation}) {
  const [checklistList, setChecklistList] = useState([]);
  const [checklistListTmp, setChecklistListTmp] = useState([]);

  function handleChecklist(checklist) {
    navigation.navigate('Checklist', {checklist});
  }

  async function handleListing() {
    const netInfoState = await NetInfo.fetch();
    const isConnected = netInfoState.isConnected;
    if (isConnected) {
      const response = await Api.get('/checklist');

      const {data} = response.data;

      await AsyncStorage.setItem('@ChecklistList', JSON.stringify(data));

      setChecklistList(data);
      setChecklistListTmp(data);
    } else {
      Alert.alert(
        'Você está sem internet a lista de Checklists pode estar desatualizada!',
      );
      const data = await AsyncStorage.getItem('@ChecklistList');
      setChecklistList(JSON.parse(data));
    }
  }

  useEffect(() => {
    const focused = navigation.addListener('focus', () => {
      handleListing();
    });
    return focused;
  });

  async function changeListChecklist(filterq) {
    const listChecklistTmp = checklistListTmp.filter(
      e =>
        e.vehicle_id
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos
          .indexOf(
            filterq
              .trim()
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''), // Remove diacríticos do termo de busca
          ) !== -1, // Verifica se o termo de busca está contido em vehicle_id
    );

    listChecklistTmp.length >= 1
      ? setChecklistListTmp(listChecklistTmp)
      : setChecklistListTmp(checklistList);
  }

  return (
    <Container>
      <FormInput
        editable={true}
        onChangeText={e => changeListChecklist(e)}
        placeholder="Pesquisar"
      />
      <List
        data={checklistListTmp}
        keyExtractor={checklist => checklist.idchecklist}
        renderItem={({item}) => (
          <ChecklistButton onPress={() => handleChecklist(item)}>
            <TopInfo>
              <ChecklistIcon>
                <Icon name="clipboard-list" size={40} color="#FFF" />
              </ChecklistIcon>
              <Infos>
                <Name>{item.description}</Name>
              </Infos>
            </TopInfo>
          </ChecklistButton>
        )}
      />
    </Container>
  );
}

ChecklistList.navigationOptions = {
  title: 'Lista de Checklist',
};
