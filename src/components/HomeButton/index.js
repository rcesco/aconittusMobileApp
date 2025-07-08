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
    iconBackground: {
      backgroundColor: color,
    },
  });

  return (
    <ButtonHome {...rest}>
      <IconContainer style={styles.iconBackground}>
        <ButtonIcon name={icon} size={40} />
      </IconContainer>
      <TextContainer>
        <ButtonText>{text}</ButtonText>
      </TextContainer>
    </ButtonHome>
  );
}
