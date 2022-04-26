import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnCustom } from '../types';
import { Typography } from '../../../../Atoms/Typography';

const CustomCell = <T,>(props: ICellProps<T, IColumnCustom<T>>): ReactElement => {
  const { column, editing, extra, forcedValue, onChange, row, rowIndex } = props;

  const isCurrentlyEditedRow =
    editing || (extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex : false);
  const displayValue = forcedValue
    ? forcedValue
    : column.customRender({
        inputValue: row && row[column.dataIndex],
        onChange: onChange,
        readOnly: !isCurrentlyEditedRow,
      });

  return (
    <td className={classnames({ ellipsis: column.ellipsis })} style={{ display: column.hidden ? 'none' : undefined }}>
      {typeof displayValue === 'string' ? (
        <Typography.Text ellipsis={column.ellipsis}>{displayValue}</Typography.Text>
      ) : (
        displayValue
      )}
    </td>
  );
};

export default CustomCell;
