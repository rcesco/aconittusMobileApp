import styled from 'styled-components';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const Background = styled.ScrollView`
  flex: 1;
  background-color: #1583f2;
`;

export const Container = styled.View`
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
  flex: 1;
`;

export const GuideContainer = styled.TouchableOpacity`
  align-items: center;
  margin: 0 20px 20px;
  padding: 0px;
  background-color: #fff;
  border-style: solid;
  min-height: 100px;
  border-radius: 5px;
`;

export const Name = styled.Text`
  font-size: 20px;
  color: #333;
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
  background-color: #164888;
  border-style: solid;
  border-radius: 0px;
  border: 10px;
  border-color: #164888;
  align-self: center;
  min-height: 100px;
  min-width: 100px;
`;

export const VideoButton = styled(Button)`
  min-width: 300px;
  min-height: 200px;
`;

export const TopInfo = styled.View`
  flex: 1;
  align-self: flex-start;
  margin: 0px 0px 0px;
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

export const ModalTerms = styled.ScrollView`
  margin: 10px;
  background-color: #fff;
  border: 10px;
  border-radius: 20px;
  border-color: #fff;
`;

export const ModalCanvas = styled.View`
  background-color: #d9d9d9;
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
  height: 35px;
  background: #164888;
  border-radius: 4px;

  justify-content: center;
`;
