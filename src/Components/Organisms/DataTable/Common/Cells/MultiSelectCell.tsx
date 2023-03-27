import React, { ReactElement } from 'react';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';

import { ICellProps } from './types';
import { IColumnMultiSelect } from '../types';

import { MultiSelectField } from '../../../../Molecules/MultiSelectField';
import { useRunAfterUpdate } from '../../../../../hooks';

const MultiSelectCell = <T,>(props: ICellProps<T, IColumnMultiSelect<T>>): ReactElement => {
  const { column, dataTestId, editing, extra, forcedValue, onChange, row, rowIndex } = props;

  const runAfterUpdate = useRunAfterUpdate();

  let displayValue = (forcedValue || (row && row[column.dataIndex]) || undefined) as Array<string> | undefined;
  const isCurrentlyEditedRow =
    editing || (extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex && column.editable : false);

  const options = typeof column.options === 'function' ? column.options(row) : column.options;

  if (column.eraseValueWhenNotInOptions && displayValue) {
    const optionValues = options.map((option) => option.value);
    const validValues = displayValue.filter((value) => optionValues.includes(value));
    if (!isEqual(validValues, displayValue)) {
      displayValue = validValues;
      if (onChange) {
        runAfterUpdate(() => {
          onChange(undefined as unknown as T[keyof T]);
        });
      }
    }
  }

  return (
    <td className={classnames({ ellipsis: column.ellipsis })} style={{ display: column.hidden ? 'none' : undefined }}>
      <MultiSelectField
        dataTestId={dataTestId}
        ellipsis={column.ellipsis}
        input={displayValue}
        isClearable={column.isClearable}
        name={column.title.toString()}
        onChange={(newValue: Array<string | number> | null | undefined) => {
          if (onChange) {
            onChange(newValue as unknown as T[keyof T]);
          }
        }}
        options={options}
        numberOfItemLabel={column.numberOfItemLabel}
        numberOfItemsLabel={column.numberOfItemsLabel}
        placeholder={column.placeholder}
        readOnly={!isCurrentlyEditedRow}
        usePortal={column.usePortal}
      />
    </td>
  );
};

export default MultiSelectCell;
