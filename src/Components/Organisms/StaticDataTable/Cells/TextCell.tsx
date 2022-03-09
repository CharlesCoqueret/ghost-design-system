import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnText } from '../types';
import { TextField } from '../../../Molecules/TextField';

const TextCell = <T,>(props: ICellProps<T, IColumnText<T>>): ReactElement => {
  const { column, editing, extra, forcedValue, onChange, row, rowIndex } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as string | undefined;
  const isCurrentlyEditedRow =
    editing || (extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex : false);

  return (
    <td className={classnames({ ellipsis: column.ellipsis })}>
      {isCurrentlyEditedRow ? (
        <TextField
          dataTestId={`${column.dataIndex}-${rowIndex}`}
          name={String(column.dataIndex)}
          inputValue={displayValue}
          onChange={(newValue: string) => {
            if (onChange) {
              onChange(newValue as unknown as T[keyof T]);
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
