import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ButtonHome = styled.TouchableOpacity`
  height: 170px;
  margin-bottom: 20px;
  border-radius: 25px;
  width: 46%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.18);
  padding: 16px;
`;

export const IconContainer = styled.View`
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 75px;
  margin-bottom: 12px;
`;

export const ButtonIcon = styled(Icon)`
  color: #fff;
`;

export const TextContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
