import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnYear } from '../types';
import { YearPickerField } from '../../../../Molecules/YearPickerField';

const YearCell = <T,>(props: ICellProps<T, IColumnYear<T>>): ReactElement => {
  const { column, dataTestId, editing, extra, forcedValue, onChange, row, rowIndex } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as number | undefined;
  const isCurrentlyEditedRow =
    editing || (extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex : false);

  return (
    <td className={classnames({ ellipsis: column.ellipsis })} style={{ display: column.hidden ? 'none' : undefined }}>
      <YearPickerField
        dataTestId={dataTestId}
        name={String(column.dataIndex)}
        inputClassName={classnames({ 'table--cell-value--date-readonly': !isCurrentlyEditedRow })}
        input={displayValue}
        onChange={(newValue: number | undefined) => {
          if (onChange) {
            onChange(newValue as unknown as T[keyof T]);
          }
        }}
        readOnly={!isCurrentlyEditedRow}
      />
    </td>
  );
};

export default YearCell;
