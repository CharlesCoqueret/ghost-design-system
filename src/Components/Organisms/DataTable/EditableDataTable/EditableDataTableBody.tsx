import React, { KeyboardEvent, ReactElement, MouseEvent, useState } from 'react';
import classnames from 'classnames';

import { IColumnType, IExtraEditableDataTableProps } from '../Common/types';
import DataTableCellSelectable from '../Common/DataTableCellSelectable';
import EditableDataTableCell from './EditableDataTableCell';
import { Icon } from '../../../Atoms/Icon';

interface IEditableDataTableBodyProps<T> {
  columns: Array<IColumnType<T>>;
  data: Array<T>;
  dataTestId?: string;
  extra: IExtraEditableDataTableProps<T>;
  handleUpdateDataChange: (rowIndex: number, dataIndex: keyof T, newData: T[keyof T]) => void;
  loading?: ReactElement;
}

const EditableDataTableBody = <T,>(props: IEditableDataTableBodyProps<T>): ReactElement => {
  const { columns, data, dataTestId, extra, handleUpdateDataChange, loading } = props;

  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});

  const isSelectable = extra.onRowSelect;
  const isExtended = extra.onRowSelect || extra.computeTotal;

  const handleRowClick = (row: T, rowIndex: number) => {
    return extra && extra.onRowClick
      ? (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
          if (event.type === 'keyup' && (event as KeyboardEvent).key !== 'Enter') {
            return;
          }
          if (extra && extra.onRowClick) {
            event.preventDefault();
            extra.onRowClick(row, rowIndex);
          }
        }
      : undefined;
  };

  /** Handle */
  const handleSelectClick = (row: T, rowIndex: number) => {
    return (_event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>, selected: boolean) => {
      const newSelectedRows = { ...selectedRows };
      newSelectedRows[rowIndex] = selected;
      setSelectedRows(newSelectedRows);
      if (extra.onRowSelect) {
        extra.onRowSelect(
          data.filter((_row, index) => newSelectedRows[index]),
          row,
          rowIndex,
        );
      }
    };
  };

  return (
    <tbody>
      {data.map((row, rowIndex) => {
        const isEditable = extra.isEditable === undefined || extra.isEditable(row, rowIndex);
        return (
          <tr
            key={`row-${rowIndex}`}
            onClick={handleRowClick(row, rowIndex)}
            onKeyUp={handleRowClick(row, rowIndex)}
            className={classnames({ pointer: extra && extra.onRowClick, selected: selectedRows[rowIndex] })}
            tabIndex={extra && extra.onRowClick ? 0 : -1}>
            {isExtended &&
              (isSelectable ? (
                <DataTableCellSelectable
                  handleSelectClick={handleSelectClick(row, rowIndex)}
                  selected={selectedRows[rowIndex]}
                  selectable={extra.isSelectable ? extra.isSelectable(row, rowIndex) : true}
                  dataTestId={`select-row-${rowIndex}`}
                />
              ) : (
                <td></td>
              ))}
            {columns.map((column) => {
              return (
                <EditableDataTableCell<T>
                  key={`cell-${rowIndex}-${column.title}`}
                  column={column}
                  dataTestId={dataTestId}
                  row={row}
                  extra={extra}
                  rowIndex={rowIndex}
                  handleUpdateDataChange={handleUpdateDataChange}
                  editable={isEditable}
                />
              );
            })}
          </tr>
        );
      })}
      {!loading && (!data || data.length === 0) && (
        <tr className='no-data'>
          <td colSpan={columns.filter((column) => !column.hidden).length + (isSelectable ? 1 : 0)}>
            <div className='no-data-container'>
              <div className='no-data-text'>{extra.localization?.noData ?? 'No data'}</div>
              <Icon icon={['fal', 'inbox']} size='2x' className='no-data-icon' />
            </div>
          </td>
        </tr>
      )}
      {loading && (
        <tr className='no-data'>
          <td colSpan={columns.filter((column) => !column.hidden).length + (isSelectable ? 1 : 0)}>{loading}</td>
        </tr>
      )}
    </tbody>
  );
};

export default EditableDataTableBody;
