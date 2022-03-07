import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnAmount } from '../types';
import { AmountField } from '../../../Molecules/AmountField';

const AmountCell = <T,>(props: ICellProps<T, IColumnAmount<T>>): ReactElement => {
  const { column, editing, extra, forcedValue, onChange, row, rowIndex } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as number | string | undefined;
  const currency = column.currency || extra?.currency;
  const isNegative = Number.isFinite(Number(displayValue)) && Number(displayValue) < 0;
  const isCurrentlyEditedRow =
    editing || (extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex : false);

  return (
    <td className={classnames({ ellipsis: column.ellipsis })}>
      <AmountField
        name={String(column.dataIndex)}
        inputClassName={classnames(
          { 'table--cell-value--negative': isNegative && !isCurrentlyEditedRow },
          { 'table--cell-value--amount-readonly': !isCurrentlyEditedRow },
        )}
        inputValue={displayValue}
        suffix={currency}
        readOnly={!isCurrentlyEditedRow}
        onChange={(newValue: number | undefined) => {
          if (onChange) {
            onChange(newValue as unknown as T[keyof T]);
          }
        }}
      />
    </td>
  );
};

export default AmountCell;
