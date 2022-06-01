import styled from 'styled-components';

export const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1060;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.5);

  .modal-body {
    padding: 0;
    padding-right: 5px;
    padding-left: 5px;
    width: 100%;
      height: 100%;
    .modal-content {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      background: transparent;
      border: none;
    }
  }
`;
