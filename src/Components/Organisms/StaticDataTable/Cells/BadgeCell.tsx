import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnBadge } from '../types';
import { Badge, BadgeColorsEnum } from '../../..';

const BadgeCell = <T,>(props: ICellProps<T, IColumnBadge<T>>): ReactElement => {
  const { column, forcedValue, row } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as number | string | undefined;

  return (
    <td className={classnames({ ellipsis: column.ellipsis })}>
      <Badge color={BadgeColorsEnum.SECONDARY} className='table--cell--value--badge-no-margin'>
        {column.options?.find((option) => option.value === displayValue)?.label || displayValue}
      </Badge>
    </td>
  );
};

export default BadgeCell;
