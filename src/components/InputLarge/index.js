import React, {forwardRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, TInput} from './styles';

function Input({style, icon, ...rest}, ref) {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="#313131" />}
      <TInput {...rest} ref={ref} />
    </Container>
  );
}

export default forwardRef(Input);
