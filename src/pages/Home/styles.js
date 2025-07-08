import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DeviceInfo from 'react-native-device-info';

const isIOS = DeviceInfo.getSystemName() === 'iOS';
const statusBarMargin = isIOS ? 60 : 25;

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #1583f2;
  padding-top: ${statusBarMargin}px;
`;

export const ContainerImage = styled.View`
  margin-top: 40px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export const HeaderContainer = styled.View`
  margin: 20px 7%;
`;

export const HeaderTitle = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 22px;
`;

export const HeaderText = styled.Text`
  margin-top: 10px;
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  text-align: justify;
`;

export const ButtonsList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  row-gap: 20px;
  column-gap: 20px;
`;

export const ButtonHome = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.1);
  height: 100px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

export const ButtonIcon = styled(Icon)`
  color: #fff;
  align-self: flex-end;
  margin-right: 10px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
`;
