import React, { ReactElement, MouseEvent, useState } from 'react';
import classnames from 'classnames';

import StaticDataTableCell from './StaticDataTableCell';
import { IColumnType, IExtraStaticDataTableProps, TableType } from './types';
import StaticDataTableCellSelectable from './StaticDataTableCellSelectable';

interface IStaticDataTableBodyProps<T> {
  columns: Array<IColumnType<T>>;
  data: Array<T>;
  extra?: IExtraStaticDataTableProps<T>;
}

const StaticDataTableBody = <T extends TableType<T>>(props: IStaticDataTableBodyProps<T>): ReactElement => {
  const { columns, data, extra } = props;

  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});

  const isSelectable = extra?.onRowSelect;

  const handleRowClick = (row: T) => {
    return extra && extra.onRowClick
      ? (event: MouseEvent<HTMLElement>) => {
          // event.stopPropagation();
          event.preventDefault();
          if (extra && extra.onRowClick) {
            extra.onRowClick(row);
          }
        }
      : undefined;
  };

  /** Handle */
  const handleSelectClick = (row: T, index: number) => {
    return (_event: MouseEvent<HTMLElement>, selected: boolean) => {
      const newSelectedRows = { ...selectedRows };
      newSelectedRows[index] = selected;
      setSelectedRows(newSelectedRows);
      if (extra?.onRowSelect) {
        extra.onRowSelect(
          data.filter((_row, index) => newSelectedRows[index]),
          row,
        );
      }
    };
  };

  return (
    <tbody>
      {data.map((row, index) => {
        return (
          <tr
            key={`row-${index}`}
            onClick={handleRowClick(row)}
            className={classnames({ pointer: extra && extra.onRowClick, selected: selectedRows[index] })}>
            {isSelectable && (
              <StaticDataTableCellSelectable
                handleSelectClick={handleSelectClick(row, index)}
                selected={selectedRows[index]}
                selectable={extra.isSelectable ? extra.isSelectable(row) : true}
              />
            )}

            {columns.map((column) => {
              return (
                <StaticDataTableCell<T> key={`cell-${index}-${column.title}`} column={column} row={row} extra={extra} />
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default StaticDataTableBody;
