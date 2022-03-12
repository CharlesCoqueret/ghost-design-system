import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnBadge } from '../types';
import { Badge } from '../../../Atoms/Badge';
import { SelectField } from '../../../Molecules/SelectField';

const BadgeCell = <T,>(props: ICellProps<T, IColumnBadge<T>>): ReactElement => {
  const { column, editing, extra, forcedValue, onChange, row, rowIndex } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex]) || '') as string | undefined;
  const isCurrentlyEditedRow =
    editing ||
    (extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex && column.options?.length > 0 : false);

  return (
    <td className={classnames({ ellipsis: column.ellipsis })}>
      {isCurrentlyEditedRow ? (
        <SelectField
          colors={column.selectColors}
          inputValue={displayValue}
          isClearable={column.isClearable}
          name={column.title.toString()}
          onChange={(newValue: string | null | undefined) => {
            if (onChange) {
              onChange(newValue as unknown as T[keyof T]);
            }
          }}
          options={column.options}
        />
      ) : (
        <Badge className='table--cell--value--badge-no-margin' color={column.color}>
          {column.options?.find((option) => option.value === displayValue)?.label || displayValue}
        </Badge>
      )}
    </td>
  );
};

export default BadgeCell;
