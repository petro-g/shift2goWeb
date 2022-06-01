import React, { FunctionComponent } from 'react';
import { IButtonProps } from './type';
import { ButtonStyled } from './styles';

const Button: FunctionComponent<IButtonProps> = props => {
  const { text, children, ...rest } = props;
  return (
    <ButtonStyled  {...rest}>
      {text} {children}
    </ButtonStyled>
  );
};

export default Button;