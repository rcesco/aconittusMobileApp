import styled from 'styled-components';

export const Container = styled.View`
  padding: 0 15px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#fff',
  selectionColor: '#fff',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #fff;
`;
