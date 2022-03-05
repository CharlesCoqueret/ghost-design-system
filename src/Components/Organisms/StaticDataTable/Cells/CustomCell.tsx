import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnCustom } from '../types';

const CustomCell = <T,>(props: ICellProps<T, IColumnCustom<T>>): ReactElement => {
  const { column, forcedValue, row } = props;

  const displayValue =
    row && column.customRender ? column.customRender(row, column.dataIndex) : forcedValue ? forcedValue : '-';

  return <td className={classnames({ ellipsis: column.ellipsis })}>{displayValue}</td>;
};

export default CustomCell;
