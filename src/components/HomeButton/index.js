import React from 'react';
import {StyleSheet} from 'react-native';

import {
  ButtonHome,
  ButtonIcon,
  ButtonText,
  IconContainer,
  TextContainer,
} from './styles';

export default function HomeButton({text, icon, color, ...rest}) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: color,
    },
    text: {
      color: '#fff',
    },
  });
  return (
    <ButtonHome {...rest}>
      <IconContainer style={styles.button} {...rest}>
        <ButtonIcon name={icon} size={50} />
      </IconContainer>
      <TextContainer>
        <ButtonText style={styles.text}>{text}</ButtonText>
      </TextContainer>
    </ButtonHome>
  );
}
