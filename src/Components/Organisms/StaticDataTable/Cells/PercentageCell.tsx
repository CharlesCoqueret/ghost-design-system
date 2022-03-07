import React, { ReactElement } from 'react';
import classnames from 'classnames';
import { ICellProps } from './types';
import { IColumnPercentage } from '../types';
import { PercentageField } from '../../../Molecules/PercentageField';

const PercentageCell = <T,>(props: ICellProps<T, IColumnPercentage<T>>): ReactElement => {
  const { column, extra, forcedValue, onChange, row, rowIndex } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as number | string | undefined;
  const isNegative = Number.isFinite(Number(displayValue)) && Number(displayValue) < 0;
  const isCurrentlyEditedRow = extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex : false;

  return (
    <td className={classnames({ ellipsis: column.ellipsis })}>
      <PercentageField
        name={String(column.dataIndex)}
        inputClassName={classnames(
          { 'table--cell-value--negative': isNegative && !isCurrentlyEditedRow },
          { 'table--cell-value--amount-readonly': !isCurrentlyEditedRow },
        )}
        inputValue={displayValue}
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

export default PercentageCell;
