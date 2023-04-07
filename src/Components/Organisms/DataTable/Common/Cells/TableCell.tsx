import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnTable } from '../types';
import { StaticDataTable } from '../../StaticDataTable';

// TODO investigate type resolution
// Using any to avoid circular type definition for now, until there is a way to get the type of an item of T[keyof T]
/**
 * @deprecated will be removed in version 2.1
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableCell = <T,>(props: ICellProps<T, IColumnTable<T, any>>): ReactElement => {
  const { column, forcedValue, row } = props;

  // TODO investigate type resolution
  // Using any to avoid circular type definition for now, until there is a way to get the type of an item of T[keyof T]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const displayValue = (forcedValue || (row && row[column.dataIndex])) as Array<any> | undefined;

  return (
    <td className={classnames({ ellipsis: column.ellipsis })} style={{ display: column.hidden ? 'none' : undefined }}>
      <StaticDataTable
        data={displayValue}
        columns={column.columns}
        extra={column.extra}
        loading={column.loading}
        onSortChange={column.onSortChange}
      />
    </td>
  );
};

export default TableCell;
