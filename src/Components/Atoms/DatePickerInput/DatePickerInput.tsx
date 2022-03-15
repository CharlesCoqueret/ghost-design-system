import React, { ReactElement } from 'react';
import DatePicker from 'react-datepicker';
import classnames from 'classnames';

import DatePickerHeader from './DatePickerHeader';
import { DateFormat, WeekDayEnum } from './types';
import { Portal } from '../Portal';

export interface IDatePickerProps {
  /** Calendar start week day (optional: default: WeekDayEnum.MONDAY )  */
  calendarStartDay?: WeekDayEnum;
  /** Class for the input (optional, default: undefined) */
  className?: string;
  /** For test purpose only */
  dataTestId?: string;
  /** Date format */
  dateFormat?: DateFormat;
  /** Disabled input (optional, default: false) */
  disabled?: boolean;
  /** Highlight value in readonly mode (optional, default: false) */
  highlighted?: boolean;
  /** Input date value (optional, default: undefined) */
  inputValue?: Date | null;
  /** Ability to clear the value (optional, default: false) */
  isClearable?: boolean;
  /** Is in Error (optional, default: false) */
  isInError?: boolean;
  /** Locale to display months and day (optional, default: undefined) */
  locale?: string;
  /** Name of date picker input */
  name: string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (date: Date | null) => void;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only input (optional, default: false) */
  readOnly?: boolean;
}

const DatePickerInput = (props: IDatePickerProps): ReactElement => {
  const {
    calendarStartDay,
    className,
    dataTestId,
    dateFormat,
    disabled,
    highlighted,
    inputValue,
    isClearable,
    isInError,
    locale,
    name,
    onChange,
    placeholder,
    readOnly,
  } = props;

  return (
    <div className={className}>
      <DatePicker
        name={name}
        selected={inputValue}
        className={classnames({
          'input-date-picker-input-read-only': readOnly,
          'input-date-picker-input': !readOnly,
          'field-highlighted': highlighted && (readOnly || disabled),
          'input-error': isInError && !readOnly && !disabled,
        })}
        data-testid={dataTestId}
        autoFocus={false}
        preventOpenOnFocus
        onChange={
          onChange ||
          (() => {
            return;
          })
        }
        disabled={disabled}
        fixedHeight
        readOnly={readOnly}
        isClearable={!disabled && isClearable}
        placeholderText={readOnly ? '-' : placeholder || dateFormat?.toUpperCase()}
        dateFormat={dateFormat}
        disabledKeyboardNavigation
        calendarStartDay={calendarStartDay}
        locale={locale}
        showPopperArrow={false}
        popperContainer={Portal}
        renderCustomHeader={DatePickerHeader(locale)}
        autoComplete='off'
      />
    </div>
  );
};

DatePickerInput.defaultProps = {
  className: undefined,
  calendarStartDay: WeekDayEnum.MONDAY,
  dateFormat: 'MMM dd, yyyy',
  dateValue: undefined,
  isInError: false,
  isClearable: false,
  highlighted: false,
  readOnly: false,
  placeholder: undefined,
  disabled: false,
  locale: undefined,
};

export default DatePickerInput;
