import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnCustom } from '../types';

const CustomCell = <T,>(props: ICellProps<T, IColumnCustom<T>>): ReactElement => {
  const { column, editing, extra, forcedValue, onChange, row, rowIndex } = props;

  const isCurrentlyEditedRow =
    editing || (extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex : false);
  const currentCustomRenderer = isCurrentlyEditedRow ? column.customRenderEdit : column.customRender;
  const displayValue = forcedValue
    ? forcedValue
    : row && currentCustomRenderer
    ? isCurrentlyEditedRow && onChange
      ? column.customRenderEdit(row, column.dataIndex, onChange, rowIndex)
      : column.customRender(row, column.dataIndex, rowIndex)
    : '-';

  return (
    <td className={classnames({ ellipsis: column.ellipsis })} style={{ display: column.hidden ? 'none' : undefined }}>
      {displayValue}
    </td>
  );
};

export default CustomCell;
