import React, { ReactElement } from 'react';

import {
  AmountCell,
  BadgeCell,
  ButtonCell,
  CodeCell,
  CustomCell,
  DateCell,
  NumberCell,
  PercentageCell,
  TextCell,
} from '../Common/Cells';
import { ColumnType, IColumnType, IExtraEditableDataTableProps } from '../Common/types';

export interface IEditableDataTableCellProps<T> {
  column: IColumnType<T>;
  dataTestId?: string;
  editable: boolean;
  row: T;
  extra?: IExtraEditableDataTableProps<T>;
  rowIndex: number;
  handleUpdateDataChange: (rowIndex: number, dataIndex: keyof T, newData: T[keyof T]) => void;
}

const EditableDataTableCell = <T,>(props: IEditableDataTableCellProps<T>): ReactElement => {
  const { column, dataTestId, editable, row, extra, rowIndex, handleUpdateDataChange } = props;

  switch (column.type) {
    case ColumnType.AMOUNT: {
      return (
        <AmountCell<T>
          column={column}
          dataTestId={dataTestId ? `${dataTestId}-${column.title}-${rowIndex}` : undefined}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          editing={editable}
        />
      );
    }
    case ColumnType.BADGE: {
      return (
        <BadgeCell<T>
          column={column}
          dataTestId={dataTestId ? `${dataTestId}-${column.title}-${rowIndex}` : undefined}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          editing={editable}
        />
      );
    }
    case ColumnType.BUTTON: {
      return (
        <ButtonCell<T>
          column={column}
          dataTestId={dataTestId ? `${dataTestId}-${column.title}-${rowIndex}` : undefined}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.CODE: {
      return (
        <CodeCell<T>
          column={column}
          dataTestId={dataTestId ? `${dataTestId}-${column.title}-${rowIndex}` : undefined}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.CUSTOM: {
      return (
        <CustomCell<T>
          column={column}
          dataTestId={dataTestId ? `${dataTestId}-${column.title}-${rowIndex}` : undefined}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          editing={editable}
        />
      );
    }
    case ColumnType.DATE: {
      return (
        <DateCell<T>
          column={column}
          dataTestId={dataTestId ? `${dataTestId}-${column.title}-${rowIndex}` : undefined}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          editing={editable}
        />
      );
    }
    case ColumnType.NUMBER: {
      return (
        <NumberCell<T>
          column={column}
          dataTestId={dataTestId ? `${dataTestId}-${column.title}-${rowIndex}` : undefined}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          editing={editable}
        />
      );
    }
    case ColumnType.PERCENTAGE: {
      return (
        <PercentageCell<T>
          column={column}
          dataTestId={dataTestId ? `${dataTestId}-${column.title}-${rowIndex}` : undefined}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          editing={editable}
        />
      );
    }
    case ColumnType.TEXT: {
      return (
        <TextCell<T>
          column={column}
          dataTestId={dataTestId ? `${dataTestId}-${column.title}-${rowIndex}` : undefined}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          editing={editable}
        />
      );
    }
    default: {
      throw new Error('Missing ColumnType');
    }
  }

  throw new Error('Should have returned by then');
};

export default EditableDataTableCell;
