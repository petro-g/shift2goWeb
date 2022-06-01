import styled from 'styled-components';

export const SideBarStyled = styled.div`
  padding-bottom: 104px;
  li {
    transition: all 0.2s linear;
    margin-top: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    a {
      width: 246px;
      height: 67px;
      color: #ffffff;
      display: flex;
      font-weight: 600;
      font-size: 18px;
      line-height: 23px;
      text-align: left;
      flex-direction: row;
      align-items: center;
      padding-left: 36.5px;
      border-radius: 18px;
      svg path{
          color: white;
          stroke: white;
        }
      svg {
        width: 19px;
        height: 18px;
        margin-right: 19.5px;
      }
      &.active {
        background: ${(props) => props.theme.colors.white};
        color: #4c4c4c;
        svg path{
          color: #4c4c4c !important;
          stroke: #4c4c4c !important;
        }
      }
      :hover {
        background: ${(props) => props.theme.colors.white};
        color: #4c4c4c;
        svg path{
          color: #4c4c4c !important;
          stroke: #4c4c4c !important;
        }
      }
    }
  }
`;
