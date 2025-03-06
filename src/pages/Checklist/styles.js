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

export const ChecklistButton = styled.TouchableOpacity`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 20px 15px 0px 15px;
  border-radius: 15px;
  min-height: 120px;
`;

export const TopInfo = styled.View`
  flex: 1;
  align-self: flex-start;
  margin: 25px 25px 0px;
  flex-direction: row;
  justify-content: flex-start;
`;

export const ChecklistIcon = styled.View`
  background-color: #36ba98;
  border-style: solid;
  border-radius: 30px;
  border: 12px;
  border-color: #36ba98;
  align-self: flex-start;
`;

export const Infos = styled.View`
  flex: 1;
  justify-content: flex-start;
  margin-top: 0px;
  margin-bottom: 20px;
`;

export const Name = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: flex-start;
  margin: 0 20px;
`;

export const FormInput = styled(Input)`
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 10px;
`;
