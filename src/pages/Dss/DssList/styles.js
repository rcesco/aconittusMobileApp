import styled from 'styled-components';
import Button from '../../../components/Button';

export const Background = styled.ScrollView`
  flex: 1;
  background-color: #1583f2;
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
  margin: 20px 15px 0px 15px;
  border-radius: 15px;
  min-height: 170px;
  flex: 1;
`;

export const Name = styled.Text`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  align-self: flex-start;
  margin: 0 10px;
`;
export const Description = styled.Text`
  font-size: 13px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
`;

export const Date = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: #999;
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
  margin: 10px 5px 5px;
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

export const DssIcon = styled.View`
  background-color: #164888;
  border-style: solid;
  border-radius: 50px;
  border: 10px;
  border-color: #164888;
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
