import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnCheckbox } from '../types';
import { CheckboxField } from '../../../../Molecules/CheckboxField';
import { IToggleEntry } from '../../../../Atoms/CheckBoxInput';

const CheckboxCell = <T,>(props: ICellProps<T, IColumnCheckbox<T>>): ReactElement => {
  const { column, dataTestId, editing, extra, forcedValue, onChange, row, rowIndex } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as unknown as Array<IToggleEntry>;
  const isCurrentlyEditedRow =
    editing || (extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex : false);

  return (
    <td
      className={classnames({ ellipsis: column.ellipsis }, 'table--cell--checkbox')}
      style={{ display: column.hidden ? 'none' : undefined }}>
      <CheckboxField
        dataTestId={dataTestId}
        inputClassName={classnames('gds-typography', { ellipsis: column.ellipsis })}
        inputValue={displayValue}
        onChange={(newValue: Array<IToggleEntry>) => {
          if (onChange) {
            onChange(newValue as unknown as T[keyof T]);
          }
        }}
        readOnly={!isCurrentlyEditedRow}
      />
    </td>
  );
};

export default CheckboxCell;
