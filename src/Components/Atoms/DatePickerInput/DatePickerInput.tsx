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
  /** Use portal, it is remmended to set it to false for modal (optional, default true) */
  usePortal?: boolean;
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
    usePortal,
  } = props;

  const localDateFormat = dateFormat || 'MMM dd, yyyy';

  return (
    <div className={classnames('field', className)}>
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
        placeholderText={readOnly ? '-' : placeholder || localDateFormat.toUpperCase()}
        dateFormat={localDateFormat}
        disabledKeyboardNavigation
        calendarStartDay={calendarStartDay}
        locale={locale}
        showPopperArrow={false}
        popperContainer={usePortal ? Portal : undefined}
        renderCustomHeader={DatePickerHeader(locale)}
        autoComplete='off'
        onClickOutside={(event) => {
          event.stopPropagation();
        }}
      />
    </div>
  );
};

DatePickerInput.defaultProps = {
  calendarStartDay: WeekDayEnum.MONDAY,
  className: undefined,
  dateValue: undefined,
  disabled: false,
  highlighted: false,
  isClearable: false,
  isInError: false,
  locale: undefined,
  placeholder: undefined,
  readOnly: false,
  usePortal: true,
};

export default DatePickerInput;
