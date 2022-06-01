import styled from 'styled-components';

export const InputStyled = styled.div`
  display: flex;
  flex-direction: column;
  // width: 27.2081rem;
  position: relative;

  svg{ 
      color: #C6C6C6;
      cursor: pointer;
      position: absolute;
      bottom: 15px;
      right: 10px;
      width: 20.95px;
      height: 20.95px;
  }

  label {
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.25rem;
    color: #636363;
    margin-bottom: 0.5775rem;
  }

  input {
    width: 100%;
    height: 3.6688rem;
    border: 0.0764rem solid #F0F0F0;
    box-sizing: border-box;
    border-radius: 0.1529rem;
    font-weight: 600;
    font-size: 18px;
    line-height: 23px;
    padding-left: 12px;
    position: relative;
    /* identical to box height */


    color: #4A4A66;

  }
`;
