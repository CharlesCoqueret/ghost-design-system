import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { ICellProps } from './types';
import { IColumnDate } from '../types';
import { DatePickerField } from '../../../Molecules/DatePickerField';

const DateCell = <T,>(props: ICellProps<T, IColumnDate<T>>): ReactElement => {
  const { column, forcedValue, row, extra } = props;

  const displayValue = (forcedValue || (row && row[column.dataIndex])) as Date | null | undefined;

  const dateFormat = column.dateFormat || extra?.dateFormat;
  return (
    <td className={classnames({ ellipsis: column.ellipsis })}>
      <DatePickerField
        name={String(column.dataIndex)}
        inputClassName='table--cell-value--date-readonly' // TODO to be dynamic once editable
        inputValue={displayValue}
        dateFormat={dateFormat}
        readOnly
      />
    </td>
  );
};

export default DateCell;
