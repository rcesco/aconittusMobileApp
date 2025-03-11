import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ButtonHome = styled.TouchableOpacity`
  height: 170px;
  margin-bottom: 20px;
  border-radius: 25px;
  width: 46%;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.18);
`;

export const ButtonIcon = styled(Icon)`
  color: #fff;
`;

export const IconContainer = styled.View`
  border-radius: 50px;
  margin-top: 20%;
  align-items: center;
  justify-content: center;
  min-width: 75px;
  min-height: 75px;
`;

export const TextContainer = styled.View`
  justify-content: center;
  align-items: center;
  min-width: 100%;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-left: 5%;
  padding-top: 8%;
  text-align: center;
`;
