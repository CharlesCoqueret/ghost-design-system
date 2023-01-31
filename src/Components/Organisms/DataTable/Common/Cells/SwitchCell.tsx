import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnSwitch } from '../types';
import { IToggleEntry } from '../../../../Atoms/CheckBoxInput';
import { SwitchField } from '../../../../Molecules/SwitchField';

const SwitchCell = <T,>(props: ICellProps<T, IColumnSwitch<T>>): ReactElement => {
  const { column, dataTestId, editing, extra, forcedValue, onChange, row, rowIndex } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as unknown as Array<IToggleEntry>;
  const isCurrentlyEditedRow =
    editing || (extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex && column.editable : false);

  return (
    <td
      className={classnames({ ellipsis: column.ellipsis }, 'table--cell--checkbox')}
      style={{ display: column.hidden ? 'none' : undefined }}>
      <SwitchField
        dataTestId={dataTestId}
        ellipsis={column.ellipsis}
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

export default SwitchCell;
