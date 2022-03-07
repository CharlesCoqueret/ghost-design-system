import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnText } from '../types';
import { TextField } from '../../../Molecules/TextField';

const TextCell = <T,>(props: ICellProps<T, IColumnText<T>>): ReactElement => {
  const { column, extra, forcedValue, onChange, row, rowIndex } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as string | undefined;
  const isCurrentlyEditedRow = extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex : false;

  return (
    <td className={classnames({ ellipsis: column.ellipsis })}>
      {isCurrentlyEditedRow ? (
        <TextField
          name={String(column.dataIndex)}
          inputValue={displayValue}
          onChange={(s) => {
            console.log('change', s);
            if (onChange) {
              onChange(s);
            }
          }}
        />
      ) : (
        displayValue
      )}
    </td>
  );
};

export default TextCell;
