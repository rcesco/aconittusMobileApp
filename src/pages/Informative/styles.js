import styled from 'styled-components';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Input from '../../components/Input';
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
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
  flex: 1;
`;

export const InformativeContainer = styled.TouchableOpacity`
  align-items: center;
  margin: 20px 15px 0px 15px;
  background-color: #fff;
  border-radius: 15px;
  min-height: 120px;
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

export const FormInput = styled(Input)`
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 10px;
`;
