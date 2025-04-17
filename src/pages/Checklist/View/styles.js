import styled from 'styled-components';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RadioButton} from 'react-native-paper';

import DeviceInfo from 'react-native-device-info';

const isIOS = DeviceInfo.getSystemName() === 'iOS';
const statusBarMargin = isIOS ? 60 : 0;

export const Background = styled.View`
  flex: 1;
  background-color: #1583f2;
  padding-top: ${statusBarMargin}px;
`;

export const Container = styled.View`
  flex: 1;
  margin: 20px;
  background-color: #1583f2;
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

export const SelectData = styled(Button)`
  margin-top: 0px;
  height: 40px;
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

export const ModalBody = styled.View`
  margin: 20px;
  background-color: rgba(64, 81, 137, 0.9);
  border: 20px;
  border-radius: 20px;
  border-color: rgba(64, 81, 137, 0.9);
  flex: 1;
`;

export const ModalButtonSelect = styled(Button)`
  margin-top: 0px;
  height: 35px;
  background: #696969;
`;

export const ModalButton = styled.TouchableOpacity`
  height: 25px;
  background: #f06548;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const ModalButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
`;

export const CompositionContainer = styled.View`
  align-items: center;
  margin: 0 20px 20px;
  padding: 0px;
  background-color: rgba(64, 81, 137, 0);
  min-height: 40px;
  flex-direction: row;
  justify-content: flex-end;
`;

export const CompositionName = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const ButtonSelectComposition = styled.TouchableOpacity`
  height: 35px;
  width: 35px;
  background: #3577f1;
  border-radius: 4px;
  margin-left: 20px;
  align-items: center;
`;

export const ButtonSelectCompositionIcon = styled(Icon)`
  color: #fff;
  margin: 5px;
`;

export const RadioContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const StyledRadioButton = styled(RadioButton)`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  border-width: 2px;
  border-color: ${props => (props.selected ? '#007BFF' : '#888')};
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const RadioText = styled.Text`
  font-size: 16px;
  color: #e0e0e0;
`;

export const InnerCircle = styled.View`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: rgb(250, 251, 253);
`;

export const QuestionContainer = styled.View`
  padding: 16px;
  margin: 8px;
  background-color: ${({isAnswered}) =>
    isAnswered ? '#4169E1' : 'rgba(255,255,255,0.05)'};
  border-radius: 8px;
  border-width: ${({isCurrent}) => (isCurrent ? '2px' : '0px')};
  border-color: ${({isCurrent}) => (isCurrent ? '#6200ee' : 'transparent')};
`;

export const currentQuestion = styled.View`
  border-color: #6200ee;
  border-width: 2px;
`;

export const answeredQuestion = styled.View`
  background-color: #e8f5e9;
`;

export const navigationContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f8f9fa;
  border-top-width: 1px;
  border-top-color: #e0e0e0;
  gap: 8px;
`;

export const disabledButton = styled.View`
  background-color: #e9ecef;
`;

export const disabledText = styled.Text`
  color: #adb5bd;
`;

export const buttonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin-horizontal: 8px;
`;

export const StyledButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${({isDisabled}) => (isDisabled ? '#e9ecef' : '#696969')};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  margin-right: 2px;
  margin-top: 2px;
`;

export const StyledButtonText = styled.Text`
  color: ${({isDisabled}) => (isDisabled ? '#adb5bd' : 'white')};
  font-weight: bold;
  font-size: 14px;
  margin-left: 3px;
`;

export const NavButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 8px;
  background-color: ${({isDisabled}) => (isDisabled ? '#e9ecef' : '#696969')};
  margin-left: 2px;
  margin-top: 2px;
`;

export const NavButtonText = styled.Text`
  color: ${({isDisabled}) => (isDisabled ? '#adb5bd' : '#fff')};
  font-weight: bold;
  font-size: 14px;
  margin-right: 3px;
`;

export const SubmitQuestions = styled.TouchableOpacity`
  flex: 1;
  background-color: #40e0d0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 8px;
  margin-left: 2px;
  margin-top: 2px;
  opacity: ${({disabled}) => (disabled ? 0.6 : 1)};
`;

export const SubmitButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 14px;
  margin-left: 2px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 4px;
  height: 40px;
  font-size: 12px;
  padding-horizontal: 4px;
`;
