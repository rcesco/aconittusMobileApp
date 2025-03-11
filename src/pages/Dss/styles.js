import styled from 'styled-components';
import Button from '../../components/Button';
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
  padding: 0 30px;
`;

export const DssName = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;

export const Instructor = styled.Text`
  font-size: 14px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Description = styled.Text`
  font-size: 12px;
  color: #fff;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const QuestionButton = styled(Button)`
  margin-top: 0px;
`;
