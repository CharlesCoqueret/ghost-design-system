import React, { ReactElement } from 'react';

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
import { ColumnType, IColumnType, IExtraLineEditableInPlaceDataTableProps } from '../Common/types';

export interface ILineEditableInPlaceDataTableCellProps<T> {
  column: IColumnType<T>;
  dataTestId?: string;
  row: T;
  extra?: IExtraLineEditableInPlaceDataTableProps<T>;
  rowIndex: number;
  handleUpdateDataChange: (rowIndex: number, dataIndex: keyof T, newData: T[keyof T]) => void;
}

const LineEditableInPlaceDataTableCell = <T,>(props: ILineEditableInPlaceDataTableCellProps<T>): ReactElement => {
  const { column, dataTestId, row, extra, rowIndex, handleUpdateDataChange } = props;

  const localDataTestId = dataTestId ? `${dataTestId}-${column.title}-${rowIndex}` : undefined;

  switch (column.type) {
    case ColumnType.AMOUNT: {
      return (
        <AmountCell<T>
          column={column}
          dataTestId={localDataTestId}
          extra={extra}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          row={row}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.BADGE: {
      return (
        <BadgeCell<T>
          column={column}
          dataTestId={localDataTestId}
          extra={extra}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          row={row}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.BUTTON: {
      return <ButtonCell<T> column={column} dataTestId={localDataTestId} extra={extra} row={row} rowIndex={rowIndex} />;
    }
    case ColumnType.CHECKBOX: {
      return (
        <CheckboxCell<T>
          column={column}
          dataTestId={localDataTestId}
          extra={extra}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          row={row}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.CODE: {
      return <CodeCell<T> column={column} dataTestId={localDataTestId} extra={extra} row={row} rowIndex={rowIndex} />;
    }
    case ColumnType.CUSTOM: {
      return (
        <CustomCell<T>
          column={column}
          dataTestId={localDataTestId}
          extra={extra}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          row={row}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.DATE: {
      return (
        <DateCell<T>
          column={column}
          dataTestId={localDataTestId}
          extra={extra}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          row={row}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.DESCRIPTION: {
      return (
        <DescriptionCell<T> column={column} dataTestId={localDataTestId} extra={extra} row={row} rowIndex={rowIndex} />
      );
    }
    case ColumnType.DYNAMICSEARCH: {
      return (
        <DynamicSearchCell<T>
          column={column}
          dataTestId={localDataTestId}
          extra={extra}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          row={row}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.FILE: {
      return (
        <FileCell<T>
          column={column}
          dataTestId={localDataTestId}
          extra={extra}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          row={row}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.MULTISELECT: {
      return (
        <MultiSelectCell<T>
          column={column}
          dataTestId={localDataTestId}
          extra={extra}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          row={row}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.NUMBER: {
      return (
        <NumberCell<T>
          column={column}
          dataTestId={localDataTestId}
          extra={extra}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          row={row}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.PERCENTAGE: {
      return (
        <PercentageCell<T>
          column={column}
          dataTestId={localDataTestId}
          extra={extra}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          row={row}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.RICHTEXT: {
      return (
        <RichTextCell<T>
          column={column}
          dataTestId={localDataTestId}
          extra={extra}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          row={row}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.SECTION: {
      return (
        <SectionCell<T> column={column} dataTestId={localDataTestId} extra={extra} row={row} rowIndex={rowIndex} />
      );
    }
    case ColumnType.SWITCH: {
      return (
        <SwitchCell<T>
          column={column}
          dataTestId={localDataTestId}
          extra={extra}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          row={row}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.TABLE: {
      return <TableCell<T> column={column} dataTestId={localDataTestId} row={row} extra={extra} rowIndex={rowIndex} />;
    }
    case ColumnType.TEXT: {
      return (
        <TextCell<T>
          column={column}
          dataTestId={localDataTestId}
          extra={extra}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          row={row}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.TEXTAREA: {
      return (
        <TextAreaCell<T>
          column={column}
          dataTestId={localDataTestId}
          extra={extra}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          row={row}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.YEAR: {
      return (
        <YearCell<T>
          column={column}
          dataTestId={localDataTestId}
          extra={extra}
          onChange={(newValue) => {
            handleUpdateDataChange(rowIndex, column.dataIndex, newValue);
          }}
          row={row}
          rowIndex={rowIndex}
        />
      );
    }
  }
};

export default LineEditableInPlaceDataTableCell;
