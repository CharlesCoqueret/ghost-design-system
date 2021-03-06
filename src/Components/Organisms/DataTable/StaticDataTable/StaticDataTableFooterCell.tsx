import React, { ReactElement } from 'react';

import { ColumnType, IColumnType, IExtraStaticDataTableProps } from '../Common/types';
import { AmountCell, NumberCell, PercentageCell } from '../Common/Cells';

export interface IStaticDataTableFooterCellProps<T> {
  column: IColumnType<T>;
  data: Array<T>;
  extra?: IExtraStaticDataTableProps<T>;
  rowIndex: number;
}

const StaticDataTableFooterCell = <T,>(props: IStaticDataTableFooterCellProps<T>): ReactElement => {
  const { column, data, extra, rowIndex } = props;

  switch (column.type) {
    case ColumnType.AMOUNT: {
      return (
        <AmountCell<T>
          column={column}
          forcedValue={extra?.computeTotal && extra.computeTotal(data, column.dataIndex)}
          extra={extra}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.NUMBER: {
      return (
        <NumberCell<T>
          column={column}
          forcedValue={extra?.computeTotal && extra.computeTotal(data, column.dataIndex)}
          extra={extra}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.PERCENTAGE: {
      return (
        <PercentageCell<T>
          column={column}
          forcedValue={extra?.computeTotal && extra.computeTotal(data, column.dataIndex)}
          extra={extra}
          rowIndex={rowIndex}
        />
      );
    }
    case ColumnType.BADGE:
    case ColumnType.BUTTON:
    case ColumnType.CHECKBOX:
    case ColumnType.CODE:
    case ColumnType.CUSTOM:
    case ColumnType.DATE:
    case ColumnType.DESCRIPTION:
    case ColumnType.DYNAMICSEARCH:
    case ColumnType.FILE:
    case ColumnType.MULTISELECT:
    case ColumnType.RICHTEXT:
    case ColumnType.SECTION:
    case ColumnType.SWITCH:
    case ColumnType.TABLE:
    case ColumnType.TEXT:
    case ColumnType.TEXTAREA:
    case ColumnType.YEAR:
      return <td className='table--footer-value center'>-</td>;
  }
};

export default StaticDataTableFooterCell;
