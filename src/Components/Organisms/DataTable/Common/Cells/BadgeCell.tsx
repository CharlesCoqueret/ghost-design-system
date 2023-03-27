import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnBadge } from '../types';
import { Badge } from '../../../../Atoms/Badge';
import { SelectField } from '../../../../Molecules/SelectField';
import { useRunAfterUpdate } from '../../../../../hooks';

const BadgeCell = <T,>(props: ICellProps<T, IColumnBadge<T>>): ReactElement => {
  const { column, editing, extra, forcedValue, onChange, row, rowIndex } = props;

  const runAfterUpdate = useRunAfterUpdate();

  const displayValue = (forcedValue || (row && row[column.dataIndex]) || undefined) as string | undefined;
  const isCurrentlyEditedRow =
    editing ||
    (extra && 'editedRowIndex' in extra
      ? extra.editedRowIndex === rowIndex && column.options.length > 0 && column.editable
      : false);

  const options = typeof column.options === 'function' ? column.options(row) : column.options;

  if (column.eraseValueWhenNotInOptions && displayValue) {
    if (!options.map((option) => option.value).includes(displayValue)) {
      if (onChange) {
        runAfterUpdate(() => {
          onChange(undefined as unknown as T[keyof T]);
        });
      }
    }
  }

  return (
    <td className={classnames({ ellipsis: column.ellipsis })} style={{ display: column.hidden ? 'none' : undefined }}>
      {isCurrentlyEditedRow ? (
        <SelectField
          input={displayValue}
          isClearable={column.isClearable}
          name={column.title.toString()}
          onChange={(newValue: string | number | null | undefined) => {
            if (onChange) {
              onChange(newValue as unknown as T[keyof T]);
            }
          }}
          options={options}
          usePortal={column.usePortal}
        />
      ) : (
        <Badge className='table--cell--value--badge-no-margin' color={column.color}>
          {options.find((option) => option.value === displayValue)?.label}
        </Badge>
      )}
    </td>
  );
};

export default BadgeCell;
