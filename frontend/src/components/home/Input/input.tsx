import React, { ReactElement } from 'react';
import { InputStyled } from './styles';
import { IInputProps } from './type';
import { IoEye, IoEyeOff } from 'react-icons/io5';

function Input(props: IInputProps): ReactElement {
  const [showPassword, setShowPassword] = React.useState(false);
  const { label, type, noLabel, ...rest } = props;
  const isPassword = type === 'password';
  const togglePassword = () => setShowPassword(!showPassword);
  return (
    <InputStyled className="inputHold">
      {noLabel ? null :<label>{label}</label>}
      <input
        type={isPassword && !showPassword ? 'password' : 'text'}
        {...rest}
      />
      {isPassword && showPassword && <IoEye onClick={togglePassword} />}
      {isPassword && !showPassword && <IoEyeOff onClick={togglePassword} />}
    </InputStyled>
  );
}

export default Input;
