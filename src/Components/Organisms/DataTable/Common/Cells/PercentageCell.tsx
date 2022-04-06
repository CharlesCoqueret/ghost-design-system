import React, { ReactElement } from 'react';
import classnames from 'classnames';
import { ICellProps } from './types';
import { IColumnPercentage } from '../types';
import { PercentageField } from '../../../../Molecules/PercentageField';

const PercentageCell = <T,>(props: ICellProps<T, IColumnPercentage<T>>): ReactElement => {
  const { column, dataTestId, editing, extra, forcedValue, onChange, row, rowIndex } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as number | string | undefined;
  const isNegative = Number.isFinite(Number(displayValue)) && Number(displayValue) < 0;
  const isCurrentlyEditedRow =
    editing || (extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex : false);

  return (
    <td className={classnames({ ellipsis: column.ellipsis })} style={{ display: column.hidden ? 'none' : undefined }}>
      <PercentageField
        allowNegative={column.allowNegative}
        dataTestId={dataTestId}
        decimalScale={column.decimalScale}
        decimalSeparator={column.decimalSeparator}
        ellipsis={column.ellipsis}
        inputClassName={classnames(
          { 'table--cell-value--negative': isNegative && !isCurrentlyEditedRow },
          { 'table--cell-value--percentage-readonly': !isCurrentlyEditedRow },
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
        readOnly={!isCurrentlyEditedRow}
        thousandSeparator={column.thousandSeparator}
        thousandsGroupStyle={column.thousandsGroupStyle}
      />
    </td>
  );
};

export default PercentageCell;
