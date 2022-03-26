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
import { ColumnType, IColumnType, IExtraLineEditableInPlaceDataTableProps } from '../Common/types';

export interface ILineEditableInPlaceDataTableCellProps<T> {
  column: IColumnType<T>;
  row: T;
  extra?: IExtraLineEditableInPlaceDataTableProps<T>;
  rowIndex: number;
  handleUpdateDataChange: (rowIndex: number, dataIndex: keyof T, newData: T[keyof T]) => void;
}

const LineEditableInPlaceDataTableCell = <T,>(props: ILineEditableInPlaceDataTableCellProps<T>): ReactElement => {
  const { column, row, extra, rowIndex, handleUpdateDataChange } = props;

  switch (column.type) {
    case ColumnType.AMOUNT: {
      return (
        <AmountCell<T>
          column={column}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
        />
      );
    }
    case ColumnType.BADGE: {
      return (
        <BadgeCell<T>
          column={column}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
        />
      );
    }
    case ColumnType.BUTTON: {
      return <ButtonCell<T> column={column} row={row} extra={extra} rowIndex={rowIndex} />;
    }
    case ColumnType.CODE: {
      return <CodeCell<T> column={column} row={row} extra={extra} rowIndex={rowIndex} />;
    }
    case ColumnType.CUSTOM: {
      return (
        <CustomCell<T>
          column={column}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
        />
      );
    }
    case ColumnType.DATE: {
      return (
        <DateCell<T>
          column={column}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
        />
      );
    }
    case ColumnType.NUMBER: {
      return (
        <NumberCell<T>
          column={column}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
        />
      );
    }
    case ColumnType.PERCENTAGE: {
      return (
        <PercentageCell<T>
          column={column}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
        />
      );
    }
    case ColumnType.TEXT: {
      return (
        <TextCell<T>
          column={column}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
        />
      );
    }
    default: {
      throw new Error('Missing ColumnType');
    }
  }

  throw new Error('Should have returned by then');
};

export default LineEditableInPlaceDataTableCell;
