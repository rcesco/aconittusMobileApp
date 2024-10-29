import styled from 'styled-components';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Background = styled.View`
  flex: 1;
  background-color: #1583f2;
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

export const ResponseText = styled.Text`
  font-size: 16px;
  color: #e0e0e0;
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

export const ModalBody = styled.View`
  margin: 20px;
  background-color: rgba(64, 81, 137, 0.9);
  border: 20px;
  border-radius: 20px;
  border-color: rgba(64, 81, 137, 0.9);
  flex: 1;
`;

export const ModalButtonSelect = styled(Button)``;

export const ModalButton = styled.TouchableOpacity`
  height: 25px;
  background: #f06548;
  border-radius: 20px;

  align-items: center;
  justify-content: center;
`;

export const ModalButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
export const FormInput = styled(Input)`
  margin-bottom: 10px;
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
