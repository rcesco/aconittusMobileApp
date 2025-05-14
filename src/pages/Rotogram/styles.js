import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const ContainerQuestion = styled.View`
  flex: 1;
`;

export const Question = styled.Text`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #fff;
`;

export const FormInput = styled(Input)`
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 10px;
`;

export const FormInputSugest = styled(Input).attrs({
  multiline: true,
})`
  background-color: #999;
  margin-top: 10px;
  height: 120px;
`;

export const RotogramContainer = styled.TouchableOpacity`
  align-items: center;
  margin: 20px 15px 0px 15px;
  background-color: #fff;
  border-radius: 15px;
  min-height: 120px;
`;

export const Name = styled.Text`
  font-size: 20px;
  color: rgb(96, 95, 95);
  font-weight: bold;
  align-self: flex-start;
  margin: 0 10px;
`;

export const Date = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  margin: 0 10px;
  align-self: flex-start;
`;

export const InfoIcon = styled.View`
  background-color: #f4a261;
  border-style: solid;
  border-radius: 30px;
  border: 12px;
  border-color: #f4a261;
  align-self: flex-start;
`;

export const VideoButton = styled(Button)`
  min-width: 300px;
  min-height: 200px;
`;

export const TopInfo = styled.View`
  flex: 1;
  align-self: flex-start;
  margin: 25px 25px 25px;
  flex-direction: row;
  justify-content: flex-start;
`;

export const DescInfo = styled.View`
  flex: 1;
  align-self: flex-start;
  margin-left: 10px;
  flex-direction: row;
`;

export const Infos = styled.View`
  flex: 1;
  justify-content: flex-start;
`;

export const ModalTerms = styled.View`
  margin: 10px;
  background-color: #fff;
  border: 10px;
  border-radius: 20px;
  border-color: #fff;
  height: 100%;
`;

export const ModalCanvas = styled.View`
  background-color: #fff;
  height: 150px;
`;

export const ModalSignature = styled.View`
  flex: 1;
  background-color: #d9d9d9;
  height: 100px;
`;

export const ModalText = styled.Text`
  color: #000;
  margin-bottom: 15px;
`;

export const ModalHeader = styled.Text`
  color: #000;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export const ButtonClear = styled.TouchableOpacity`
  margin-top: 5px;
  margin-bottom: 25px;
  margin-left: 10px;
  width: 140px;
  height: 46px;
  background: #164888;
  border-radius: 4px;

  align-items: center;
  justify-content: center;
`;

export const ButtonClearIcon = styled(Icon)`
  color: #fff;
  margin: 20px;
`;

export const ButtonClearText = styled.Text`
  color: #fff;
  font-size: 14px;
  text-align: center;
`;

export const ButtonsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

export const SignatureButtonsContainer = styled.View`
  margin: 0;
  padding: 0;
  background-color: #fff;
  min-height: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonSignature = styled.TouchableOpacity`
  width: 100px;
  min-height: 45px;
  background: #164888;
  border-radius: 4px;

  justify-content: center;
`;

export const CheckIcon = styled.View`
  background-color: #02b1a0;
  border-style: solid;
  border-radius: 50px;
  border: 15px;
  border-color: #02b1a0;
  align-self: flex-start;
`;
