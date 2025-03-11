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
  margin: 20px;
`;

export const ContainerQuestion = styled.View`
  margin-right: 20px;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
})`
  margin-top: 10px;
  flex: 1;
`;

export const Question = styled.Text`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #fff;
`;

export const SubmitQuestions = styled(Button)`
  margin-top: 20px;
`;

export const ButtonModal = styled.TouchableOpacity`
  margin-top: 10px;
  min-width: 200px;
  height: 46px;
  background: #367fa9;
  border-radius: 4px;

  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: 20px;
  background-color: #fff;
  border-radius: 20px;
  padding: 35px;
  box-shadow: 30px 10px 10px #000;
`;

export const ModalOverContainer = styled.View`
  flex: 1;
`;

export const ModalText = styled.Text`
  font-size: 18px;
  text-align: center;
`;

export const ButtonModalText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const QuestionAnswer = styled.Text`
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #fff;
`;
