import React, { FunctionComponent } from 'react';
import { ITableProps } from './type';
import { TableStyled } from './styles';
import { ReactSVG } from 'react-svg';

const Button: FunctionComponent<ITableProps> = (props) => {
  const { data, columns, noDataIcon, noData, children, ...rest } = props;
  return (
    <TableStyled>
      <thead>
        <tr>
          {columns &&
            columns.map((column: string, index: number) => (
              <th key={column}>{column}</th>
            ))}
        </tr>
      </thead>
      <tbody className={`${!data || !data.length ? 'empty' : ''}`}>
        {data &&
          data.map((row: any) => (
            <tr key={row.id}>
              {columns &&
                columns.map((column: any) => (
                  <td key={column.key}>{row[column.key]}</td>
                ))}
            </tr>
          ))}
        {!data || data.length === 0 ? (
          <div
            className="absolute top-0 right-0 left-0 bottom-0 flex flex-col 
        justify-center items-center"
          >
            {noDataIcon}
            <h1 className="noData">{noData}</h1>
          </div>
        ) : null}
      </tbody>
    </TableStyled>
  );
};

export default Button;
