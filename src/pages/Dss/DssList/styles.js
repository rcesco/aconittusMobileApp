import styled from 'styled-components';
import Button from '../../../components/Button';
import DeviceInfo from 'react-native-device-info';

const isIOS = DeviceInfo.getSystemName() === 'iOS';
const statusBarMargin = isIOS ? 60 : 0;

export const Background = styled.ScrollView`
  flex: 1;
  background-color: #1583f2;
  padding-top: ${statusBarMargin}px;
`;

export const Container = styled.View`
  flex: 1;
  padding: 0px;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Dss = styled.TouchableOpacity`
  align-items: center;
  margin: 20px 15px 10px 15px;
  border-radius: 15px;
  min-height: 170px;
`;

export const Name = styled.Text`
  font-size: 20px;
  color: rgb(96, 95, 95);
  font-weight: bold;
  align-self: flex-start;
  margin: 0 10px;
`;
export const Description = styled.Text`
  font-size: 13px;
  line-height: 18px;
  color: rgb(96, 95, 95);
  margin-top: 5px;
`;

export const Date = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: rgb(96, 95, 95);
  margin-top: 5px;
  margin: 0 10px;
  align-self: flex-start;
`;

export const VideoButton = styled(Button)`
  min-width: 200px;
`;

export const TopInfo = styled.View`
  flex: 1;
  align-self: flex-start;
  margin: 20px 20px 0px;
  flex-direction: row;
  justify-content: flex-start;
`;

export const DescInfo = styled.View`
  flex: 1;
  align-self: flex-start;
  margin: 20px 20px 25px;
  flex-direction: row;
  justify-content: flex-start;
`;

export const Infos = styled.View`
  flex: 1;
  justify-content: flex-start;
`;

export const DssIcon = styled.View`
  background-color: #e9c46a;
  border-style: solid;
  border-radius: 50px;
  border: 10px;
  border-color: #e9c46a;
  align-self: flex-start;
`;

export const CheckIcon = styled.View`
  background-color: #02b1a0;
  border-style: solid;
  border-radius: 50px;
  border: 15px;
  border-color: #02b1a0;
  align-self: flex-start;
`;
