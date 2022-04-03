import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnTextArea } from '../types';
import { TextAreaField } from '../../../../Molecules/TextAreaField';

const TextAreaCell = <T,>(props: ICellProps<T, IColumnTextArea<T>>): ReactElement => {
  const { column, dataTestId, editing, extra, forcedValue, onChange, row, rowIndex } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as string | undefined;
  const isCurrentlyEditedRow =
    editing || (extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex : false);

  return (
    <td className={classnames({ ellipsis: column.ellipsis })} style={{ display: column.hidden ? 'none' : undefined }}>
      <TextAreaField
        dataTestId={dataTestId}
        inputClassName={classnames('gds-typography', { ellipsis: column.ellipsis })}
        inputValue={displayValue}
        maxLength={column.maxLength}
        minLength={column.minLength}
        name={String(column.dataIndex)}
        onChange={(newValue: string) => {
          if (onChange) {
            onChange(newValue as unknown as T[keyof T]);
          }
        }}
        placeholder={column.placeholder}
        readOnly={!isCurrentlyEditedRow}
      />
    </td>
  );
};

export default TextAreaCell;
