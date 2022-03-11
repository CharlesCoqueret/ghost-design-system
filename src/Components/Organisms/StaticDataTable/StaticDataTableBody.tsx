import React, { ReactElement, MouseEvent, useState } from 'react';
import classnames from 'classnames';

import StaticDataTableCell from './StaticDataTableCell';
import { IColumnType, IExtraLineEditableInPlaceDataTableProps } from './types';
import StaticDataTableCellSelectable from './StaticDataTableCellSelectable';

interface IStaticDataTableBodyProps<T> {
  columns: Array<IColumnType<T>>;
  data: Array<T>;
  extra?: IExtraLineEditableInPlaceDataTableProps<T>;
}

const StaticDataTableBody = <T,>(props: IStaticDataTableBodyProps<T>): ReactElement => {
  const { columns, data, extra } = props;

  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});

  const isSelectable = extra?.onRowSelect;
  const isExtended = extra?.onRowSelect || extra?.computeTotal;

  const handleRowClick = (row: T) => {
    return extra && extra.onRowClick
      ? (event: MouseEvent<HTMLElement>) => {
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
      {data.map((row, rowIndex) => {
        return (
          <tr
            key={`row-${rowIndex}`}
            onClick={handleRowClick(row)}
            className={classnames({ pointer: extra && extra.onRowClick, selected: selectedRows[rowIndex] })}>
            {isExtended &&
              (isSelectable ? (
                <StaticDataTableCellSelectable
                  handleSelectClick={handleSelectClick(row, rowIndex)}
                  selected={selectedRows[rowIndex]}
                  selectable={(extra && extra.isSelectable ? extra?.isSelectable(row) : true) && !extra?.editedRowIndex}
                />
              ) : (
                <td></td>
              ))}

            {columns.map((column) => {
              return (
                <StaticDataTableCell<T>
                  key={`cell-${rowIndex}-${column.title}`}
                  column={column}
                  row={row}
                  extra={extra}
                  rowIndex={rowIndex}
                />
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default StaticDataTableBody;
