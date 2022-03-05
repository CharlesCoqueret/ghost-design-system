import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnText } from '../types';

const TextCell = <T,>(props: ICellProps<T, IColumnText<T>>): ReactElement => {
  const { column, forcedValue, row } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as string | undefined;

  return <td className={classnames({ ellipsis: column.ellipsis })}>{displayValue}</td>;
};

export default TextCell;
