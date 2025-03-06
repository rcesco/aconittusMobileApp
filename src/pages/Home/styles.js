import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DeviceInfo from 'react-native-device-info';

const isIOS = DeviceInfo.getSystemName() === 'iOS';
const statusBarMargin = isIOS ? 60 : 0;

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #1583f2;
  padding-top: ${statusBarMargin}px;
`;

export const ContainerImage = styled.View`
  top: 60px;
  bottom: 20px;
  justify-content: 'center';
  align-items: 'center';
  height: 100px;
`;

export const HeaderContainer = styled.View`
  top: 30px;
  left: 7%;
  right: 7%;
  height: 50px;
  max-width: 86%;
`;

export const HeaderTitle = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 24px;
`;

export const HeaderText = styled.Text`
  top: 10px;
  color: #fff;
  font-size: 12px;
  text-align: justify;
`;

export const ButtonsList = styled.View`
  flex: 1;
  top: 12%;
  margin: 25px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ButtonHome = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.1);
  height: 100px;
  flex: 1;
  margin: 10px 10px 0px 10px;
  border-radius: 15px;
`;

export const ButtonIcon = styled(Icon)`
  color: #fff;
  padding-left: 80%;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-left: 10%;
`;
