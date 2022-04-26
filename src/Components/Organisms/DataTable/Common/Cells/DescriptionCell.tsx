import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnDescription } from '../types';

const DescriptionCell = <T,>(props: ICellProps<T, IColumnDescription<T>>): ReactElement => {
  const { column, forcedValue, row } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as T[keyof T];

  return (
    <td
      className={classnames({ ellipsis: column.ellipsis }, 'table--cell--code')}
      style={{ display: column.hidden ? 'none' : undefined }}>
      {typeof column.description === 'function' ? <column.description value={displayValue} /> : column.description}
    </td>
  );
};

export default DescriptionCell;
