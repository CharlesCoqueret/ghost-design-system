import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnDate } from '../types';
import { DatePickerField } from '../../../../Molecules/DatePickerField';

const DateCell = <T,>(props: ICellProps<T, IColumnDate<T>>): ReactElement => {
  const { column, dataTestId, editing, extra, forcedValue, onChange, row, rowIndex } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as Date | null | undefined;
  const dateFormat = column.dateFormat || extra?.dateFormat;
  const isCurrentlyEditedRow =
    editing || (extra && 'editedRowIndex' in extra ? extra.editedRowIndex === rowIndex && column.editable : false);

  return (
    <td className={classnames({ ellipsis: column.ellipsis })} style={{ display: column.hidden ? 'none' : undefined }}>
      <DatePickerField
        dataTestId={dataTestId}
        calendarStartDay={column.calendarStartDay}
        dateFormat={dateFormat}
        name={String(column.dataIndex)}
        inputClassName={classnames({ 'table--cell-value--date-readonly': !isCurrentlyEditedRow })}
        inputValue={displayValue}
        isClearable={column.isClearable}
        locale={column.locale}
        onChange={(newValue: Date | null) => {
          if (onChange) {
            onChange(newValue as unknown as T[keyof T]);
          }
        }}
        readOnly={!isCurrentlyEditedRow}
      />
    </td>
  );
};

export default DateCell;
