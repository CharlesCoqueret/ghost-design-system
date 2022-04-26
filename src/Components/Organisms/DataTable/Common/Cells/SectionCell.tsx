import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnSection } from '../types';

const SectionCell = <T,>(props: ICellProps<T, IColumnSection<T>>): ReactElement => {
  const { column, forcedValue, row } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex]) || column.label) as string | undefined;

  return (
    <td className={classnames({ ellipsis: column.ellipsis })} style={{ display: column.hidden ? 'none' : undefined }}>
      {displayValue}
    </td>
  );
};

export default SectionCell;
