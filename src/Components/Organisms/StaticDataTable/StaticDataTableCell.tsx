import React, { ReactElement } from 'react';

import { ColumnType, IColumnType, IExtraStaticDataTableProps, TableType } from './types';
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
} from './Cells';

export interface IStaticDataTableCellProps<T> {
  column: IColumnType<T>;
  row: T;
  extra?: IExtraStaticDataTableProps<T>;
}

const StaticDataTableCell = <T extends TableType<T>>(props: IStaticDataTableCellProps<T>): ReactElement => {
  const { column, row, extra } = props;

  switch (column.type) {
    case ColumnType.AMOUNT: {
      return <AmountCell<T> column={column} row={row} extra={extra} />;
    }
    case ColumnType.BADGE: {
      return <BadgeCell<T> column={column} row={row} extra={extra} />;
    }
    case ColumnType.BUTTON: {
      return <ButtonCell<T> column={column} row={row} extra={extra} />;
    }
    case ColumnType.CODE: {
      return <CodeCell<T> column={column} row={row} extra={extra} />;
    }
    case ColumnType.CUSTOM: {
      return <CustomCell<T> column={column} row={row} extra={extra} />;
    }
    case ColumnType.DATE: {
      return <DateCell<T> column={column} row={row} extra={extra} />;
    }
    case ColumnType.NUMBER: {
      return <NumberCell<T> column={column} row={row} extra={extra} />;
    }
    case ColumnType.PERCENTAGE: {
      return <PercentageCell<T> column={column} row={row} extra={extra} />;
    }
    case ColumnType.TEXT: {
      return <TextCell<T> column={column} row={row} extra={extra} />;
    }
    default: {
      throw new Error('Missing ColumnType');
      break;
    }
  }

  throw new Error('Should have returned by then');
};

export default StaticDataTableCell;
