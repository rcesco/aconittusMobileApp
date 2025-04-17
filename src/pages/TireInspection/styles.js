import styled from 'styled-components';
import Input from '../../components/Input';
import DeviceInfo from 'react-native-device-info';

const isIOS = DeviceInfo.getSystemName() === 'iOS';
const statusBarMargin = isIOS ? 60 : 0;

export const Container = styled.View`
  flex: 1;
  padding: 0px;
  background-color: #1583f2;
  padding-top: ${statusBarMargin}px;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
})`
  margin-top: 20px;
  flex: 1;
`;
