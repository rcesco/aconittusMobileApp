import styled from 'styled-components';

export const Container = styled.View`
  padding: 0 15px;
  height: 70px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#8c8c8c',
  selectionColor: '#313131',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #313131;
`;
