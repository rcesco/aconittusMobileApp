import React, {useState, useEffect} from 'react';
import Api from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import {
  Container,
  List,
  PersonAssessmentButton,
  TopInfo,
  PersonAssessmentIcon,
  Infos,
  Name,
  FormInput,
  CheckPersonAssessmentIcon,
} from './styles';
import {Alert} from 'react-native';

export default function PersonAssessmentList({navigation}) {
  const [testList, setPersonAssessmentList] = useState([]);
  const [testListTmp, setPersonAssessmentListTmp] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  function handlePersonAssessment(personAssessmentItem) {
    navigation.navigate('PersonAssessmentView', {personAssessmentItem});
  }

  async function handleListing() {
    setRefreshing(true);
    const netInfoState = await NetInfo.fetch();
    const isConnected = netInfoState.isConnected;

    if (isConnected) {
      try {
        const response = await Api.get('/person_assessment/listForApp');
        const {data} = response.data;

        if (Array.isArray(data)) {
          await AsyncStorage.setItem(
            '@PersonAssessmentList',
            JSON.stringify(data),
          );
          setPersonAssessmentList(data);
          setPersonAssessmentListTmp(data);
        } else {
          throw new Error('Formato inválido de dados');
        }
      } catch (error) {
        Alert.alert('Erro ao carregar os dados: ' + error);
      }
    } else {
      Alert.alert(
        'Você está sem internet. A lista de Avaliações pode estar desatualizada!',
      );
      const data = await AsyncStorage.getItem('@PersonAssessmentList');
      if (data) {
        setPersonAssessmentList(JSON.parse(data));
        setPersonAssessmentListTmp(JSON.parse(data));
      }
    }

    setRefreshing(false);
  }

  useEffect(() => {
    const focused = navigation.addListener('focus', () => {
      handleListing();
    });
    return focused;
  });

  async function changeListPersonAssessment(filterq) {
    const listPersonAssessmentTmp = testListTmp.filter(
      e =>
        e.description
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .indexOf(
            filterq
              .trim()
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''),
          ) !== -1,
    );

    listPersonAssessmentTmp.length >= 1
      ? setPersonAssessmentListTmp(listPersonAssessmentTmp)
      : setPersonAssessmentListTmp(testList);
  }

  return (
    <Container>
      <FormInput
        editable={true}
        onChangeText={e => changeListPersonAssessment(e)}
        placeholder="Pesquisar"
      />
      <List
        data={testListTmp}
        keyExtractor={item => item.idperson_assessment}
        renderItem={({item}) => (
          <PersonAssessmentButton onPress={() => handlePersonAssessment(item)}>
            <TopInfo>
              <PersonAssessmentIcon>
                <Icon name="file-document-multiple" size={40} color="#FFF" />
              </PersonAssessmentIcon>
              <Infos>
                <Name>{item.description.trim()}</Name>
              </Infos>
              {item.idperson_assessment_performed !== null ? (
                <CheckPersonAssessmentIcon>
                  <Icon name="check" color="#FFF" size={20} />
                </CheckPersonAssessmentIcon>
              ) : (
                <Name />
              )}
            </TopInfo>
          </PersonAssessmentButton>
        )}
        refreshing={refreshing}
        onRefresh={handleListing}
      />
    </Container>
  );
}

PersonAssessmentList.navigationOptions = {
  title: 'Lista de Avaliações',
};
