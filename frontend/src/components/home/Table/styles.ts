import styled from 'styled-components';
import { ITableProps } from './type';

export const TableStyled = styled.table<ITableProps>`
  width: 100%;
  height: 100%;
  position: relative;
  thead {
    height: 72px;
    width: 100%;
    border-bottom: 1.7963px solid #f5f8fc;
    th {
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      color: #95a3c8;
      text-align: center;
    }
  }
  tbody {
    width: 100%;
    height: 100%;

    &.empty{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
  }

  .noData {
    font-weight: 600;
    font-size: 30px;
    line-height: 38px;
    color: #bcc0c5;
  }
`;
