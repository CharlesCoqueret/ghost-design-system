import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnCode } from '../types';

const CodeCell = <T,>(props: ICellProps<T, IColumnCode<T>>): ReactElement => {
  const { column, forcedValue, row, rowIndex } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as string | undefined;

  return (
    <td
      className={classnames({ ellipsis: column.ellipsis }, 'table--cell--code')}
      data-testid={`${column.dataIndex}-${rowIndex}`}>
      {displayValue}
    </td>
  );
};

export default CodeCell;
