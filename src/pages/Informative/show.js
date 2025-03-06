import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Api from '../../services/api';

import Pdf from 'react-native-pdf';

import {ButtonClear, ButtonClearText} from './styles';
import DeviceInfo from 'react-native-device-info';

const isIOS = DeviceInfo.getSystemName() === 'iOS';

const ShowInformatives = ({route, navigation}) => {
  //console.tron.log(Api.defaults.headers.Authorization);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: isIOS ? 60 : 25,
    },
    melhoria: {marginTop: isIOS ? 60 : 25},
    pdf: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

  const customHeaders = {
    Authorization: `${Api.defaults.headers.Authorization}`,
  };

  const handleInformatives = () => {
    navigation.navigate('Informative');
  };

  const source = {
    uri: `${Api.defaults.baseURL}informative/viewfile/${route.params.info.file}`,
    cache: false,
    headers: customHeaders,
  };

  async function handleParticipation() {
    try {
      const response = await Api.post('/informative_view', {
        idInformative: route.params.info.idinformative,
      });
      //console.tron.log(response);
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
      <ButtonClear onPress={() => handleInformatives()}>
        <ButtonClearText>Voltar</ButtonClearText>
      </ButtonClear>
      <Pdf
        source={source}
        trustAllCerts={false}
        onLoadComplete={(numberOfPages, filePath) => {
          handleParticipation();
        }}
        style={styles.pdf}
      />
    </View>
  );
};

export default ShowInformatives;

ShowInformatives.navigationOptions = {
  title: 'Informativo',
};
