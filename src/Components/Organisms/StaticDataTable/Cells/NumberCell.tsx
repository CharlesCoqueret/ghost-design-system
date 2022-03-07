import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnNumber } from '../types';
import { AmountField } from '../../../Molecules/AmountField';

const NumberCell = <T,>(props: ICellProps<T, IColumnNumber<T>>): ReactElement => {
  const { column, extra, forcedValue, onChange, row, rowIndex } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as number | string | undefined;
  const isNegative = Number.isFinite(Number(displayValue)) && Number(displayValue) < 0;
  const isCurrentlyEditedRow = extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex : false;

  return (
    <td className={classnames({ ellipsis: column.ellipsis })}>
      <AmountField
        name={String(column.dataIndex)}
        inputClassName={classnames(
          { 'table--cell-value--negative': isNegative && !isCurrentlyEditedRow },
          { 'table--cell-value--amount-readonly': !isCurrentlyEditedRow },
        )}
        inputValue={displayValue}
        readOnly={!isCurrentlyEditedRow}
        onChange={onChange}
      />
    </td>
  );
};

export default NumberCell;
