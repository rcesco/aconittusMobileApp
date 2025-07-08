import React, {useEffect, useRef} from 'react';
import {StyleSheet, Dimensions, View, Image} from 'react-native';
import Api from '../../services/api';
import Pdf from 'react-native-pdf';
import {ButtonClear, ButtonClearText} from './styles';
import DeviceInfo from 'react-native-device-info';

const isIOS = DeviceInfo.getSystemName() === 'iOS';

const ShowInformatives = ({route, navigation}) => {
  const file = route.params.info.file;
  const fileExtension = file.split('.').pop().toLowerCase();
  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: isIOS ? 60 : 25,
    },
    pdf: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    image: {
      flex: 1,
      width: Dimensions.get('window').width,
      resizeMode: 'contain',
    },
  });

  const customHeaders = {
    Authorization: `${Api.defaults.headers.Authorization}`,
  };

  const source = {
    uri: `${Api.defaults.baseURL}informative/viewfile/${file}`,
    cache: false,
    headers: customHeaders,
  };

  const handleInformatives = () => {
    navigation.navigate('Informative');
  };

  const hasParticipated = useRef(false);

  async function handleParticipation() {
    try {
      await Api.post('/informative_view', {
        idInformative: route.params.info.idinformative,
      });
    } catch (error) {
      console.log('Erro ao registrar participação:', error);
    }
  }

  useEffect(() => {
    if (isImage && !hasParticipated.current) {
      handleParticipation();
      hasParticipated.current = true;
    }
  }, [isImage]);

  return (
    <View style={styles.container}>
      <ButtonClear onPress={handleInformatives}>
        <ButtonClearText>Voltar</ButtonClearText>
      </ButtonClear>

      {isImage ? (
        <Image
          source={{uri: source.uri, headers: customHeaders}}
          style={styles.image}
        />
      ) : (
        <Pdf
          source={source}
          trustAllCerts={false}
          onLoadComplete={() => {
            if (!hasParticipated.current) {
              handleParticipation();
              hasParticipated.current = true;
            }
          }}
          style={styles.pdf}
        />
      )}
    </View>
  );
};

export default ShowInformatives;

ShowInformatives.navigationOptions = {
  title: 'Informativo',
};
