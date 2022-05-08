import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnAmount } from '../types';
import { AmountField } from '../../../../Molecules/AmountField';

const AmountCell = <T,>(props: ICellProps<T, IColumnAmount<T>>): ReactElement => {
  const { column, editing, extra, forcedValue, onChange, row, rowIndex } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as number | string | undefined;
  const suffix = column.suffix || extra?.currency;
  const isNegative = Number.isFinite(Number(displayValue)) && Number(displayValue) < 0;
  const isCurrentlyEditedRow =
    editing || (extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex && column.editable : false);

  return (
    <td className={classnames({ ellipsis: column.ellipsis })} style={{ display: column.hidden ? 'none' : undefined }}>
      <AmountField
        allowNegative={column.allowNegative}
        decimalScale={column.decimalScale}
        decimalSeparator={column.decimalSeparator}
        ellipsis={column.ellipsis}
        inputClassName={classnames(
          { 'table--cell-value--negative': isNegative && !isCurrentlyEditedRow },
          { 'table--cell-value--amount-readonly': !isCurrentlyEditedRow },
        )}
        inputValue={displayValue}
        maxValue={column.maxValue}
        minValue={column.minValue}
        name={String(column.dataIndex)}
        onChange={(newValue: number | undefined) => {
          if (onChange) {
            onChange(newValue as unknown as T[keyof T]);
          }
        }}
        placeholder={column.placeholder}
        thousandSeparator={column.thousandSeparator}
        thousandsGroupStyle={column.thousandsGroupStyle}
        readOnly={!isCurrentlyEditedRow}
        suffix={suffix}
      />
    </td>
  );
};

export default AmountCell;
