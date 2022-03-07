import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnBadge } from '../types';
import { Badge, BadgeColorsEnum } from '../../../Atoms/Badge';
import { SelectField } from '../../../Molecules/SelectField';
import { IOption } from '../../../Atoms/SelectInput/types';

const BadgeCell = <T,>(props: ICellProps<T, IColumnBadge<T>>): ReactElement => {
  const { column, editing, extra, forcedValue, onChange, row, rowIndex } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as number | string | undefined;
  const isCurrentlyEditedRow =
    editing ||
    (extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex && column.options?.length > 0 : false);

  return (
    <td className={classnames({ ellipsis: column.ellipsis })}>
      {isCurrentlyEditedRow ? (
        <SelectField
          name={column.title.toString()}
          inputValue={column.options?.find((option) => option.value === displayValue)}
          options={column.options}
          onChange={(newValue: IOption | null | undefined) => {
            if (onChange) {
              onChange(newValue as unknown as T[keyof T]);
            }
          }}
        />
      ) : (
        <Badge color={BadgeColorsEnum.SECONDARY} className='table--cell--value--badge-no-margin'>
          {column.options?.find((option) => option.value === displayValue)?.label || displayValue}
        </Badge>
      )}
    </td>
  );
};

export default BadgeCell;
