import React, { ReactElement } from 'react';

import { ColumnType, IColumnType, IExtraStaticDataTableProps } from '../Common/types';
import {
  AmountCell,
  BadgeCell,
  ButtonCell,
  CheckboxCell,
  CodeCell,
  CustomCell,
  DateCell,
  DescriptionCell,
  DynamicSearchCell,
  FileCell,
  MultiSelectCell,
  NumberCell,
  PercentageCell,
  RichTextCell,
  SectionCell,
  SwitchCell,
  TableCell,
  TextAreaCell,
  TextCell,
  YearCell,
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

  const localDataTestId = dataTestId ? `${dataTestId}-${column.title}-${rowIndex}` : undefined;

  switch (column.type) {
    case ColumnType.AMOUNT: {
      return <AmountCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />;
    }
    case ColumnType.BADGE: {
      return <BadgeCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />;
    }
    case ColumnType.BUTTON: {
      return <ButtonCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />;
    }
    case ColumnType.CHECKBOX: {
      return (
        <CheckboxCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />
      );
    }
    case ColumnType.CODE: {
      return <CodeCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />;
    }
    case ColumnType.CUSTOM: {
      return <CustomCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />;
    }
    case ColumnType.DATE: {
      return <DateCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />;
    }
    case ColumnType.DESCRIPTION: {
      return (
        <DescriptionCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />
      );
    }
    case ColumnType.DYNAMICSEARCH: {
      return (
        <DynamicSearchCell<T>
          column={column}
          dataTestId={localDataTestId}
          row={row}
          extra={extra}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.FILE: {
      return <FileCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />;
    }
    case ColumnType.MULTISELECT: {
      return (
        <MultiSelectCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />
      );
    }
    case ColumnType.NUMBER: {
      return <NumberCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />;
    }
    case ColumnType.PERCENTAGE: {
      return (
        <PercentageCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />
      );
    }
    case ColumnType.RICHTEXT: {
      return (
        <RichTextCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />
      );
    }
    case ColumnType.SECTION: {
      return (
        <SectionCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />
      );
    }
    case ColumnType.SWITCH: {
      return <SwitchCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />;
    }
    case ColumnType.TABLE: {
      return <TableCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />;
    }
    case ColumnType.TEXT: {
      return <TextCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />;
    }
    case ColumnType.TEXTAREA: {
      return (
        <TextAreaCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />
      );
    }
    case ColumnType.YEAR: {
      return <YearCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />;
    }
  }
};

export default StaticDataTableCell;
