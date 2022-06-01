import React, { ReactElement } from 'react';
import { ModalStyled } from './styles';
import { IModalProps } from './type';
import { IoEye, IoEyeOff } from 'react-icons/io5';

function Input(props: IModalProps): ReactElement {
  const {children} = props;
  return (
    <ModalStyled>
     <div className="modal-body">
      <div className="modal-content">
      {children}
      </div>
     </div>
    </ModalStyled>
  );
}

export default Input;
