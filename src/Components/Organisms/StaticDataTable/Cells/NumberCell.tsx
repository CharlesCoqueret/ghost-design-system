import React, { ReactElement } from 'react';
import classnames from 'classnames';
import { ICellProps } from './types';
import { IColumnNumber } from '../types';
import { AmountField } from '../../..';

const NumberCell = <T,>(props: ICellProps<T, IColumnNumber<T>>): ReactElement => {
  const { column, forcedValue, row } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as number | string | undefined;

  const isNegative = Number.isFinite(Number(displayValue)) && Number(displayValue) < 0;

  return (
    <td className={classnames({ ellipsis: column.ellipsis })}>
      <AmountField
        name={String(column.dataIndex)}
        inputClassName={classnames(
          { 'table--cell-value--negative': isNegative },
          'table--cell-value--amount-readonly', // TODO to be dynamic once editable
        )}
        inputValue={displayValue}
        readOnly // TODO to be dynamic once editable, keep readonly when forced value
      />
    </td>
  );
};

export default NumberCell;