import React, { ReactElement } from 'react';

import { ColumnType, IColumnType, IExtraStaticDataTableProps } from '../Common/types';
import {
  AmountCell,
  BadgeCell,
  ButtonCell,
  CheckboxCell,
  CodeCell,
  CustomCell,
  DynamicSearchCell,
  DateCell,
  NumberCell,
  PercentageCell,
  TextCell,
  TextAreaCell,
} from '../Common/Cells';

export interface IStaticDataTableCellProps<T> {
  column: IColumnType<T>;
  dataTestId?: string;
  row: T;
  extra?: IExtraStaticDataTableProps<T>;
  rowIndex: number;
}

const StaticDataTableCell = <T,>(props: IStaticDataTableCellProps<T>): ReactElement => {
  const { column, dataTestId, row, extra, rowIndex } = props;

  switch (column.type) {
    case ColumnType.AMOUNT: {
      return (
        <AmountCell<T>
          column={column}
          dataTestId={dataTestId ? `${dataTestId}-${column.title}-${rowIndex}` : undefined}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
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
    case ColumnType.CHECKBOX: {
      return (
        <CheckboxCell<T>
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
        />
      );
    }
    case ColumnType.DYNAMICSEARCH: {
      return (
        <DynamicSearchCell<T>
          column={column}
          dataTestId={dataTestId ? `${dataTestId}-${column.title}-${rowIndex}` : undefined}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
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
        />
      );
    }
    case ColumnType.TEXTAREA: {
      return (
        <TextAreaCell<T>
          column={column}
          dataTestId={dataTestId ? `${dataTestId}-${column.title}-${rowIndex}` : undefined}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
        />
      );
    }
    default: {
      throw new Error('Missing ColumnType');
    }
  }

  throw new Error('Should have returned by then');
};

export default StaticDataTableCell;
