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
  /** Maximum date that can be picked (optional, default: undefined) */
  maxDate?: Date;
  /** Minimum date that can be picked (optional, default: undefined) */
  minDate?: Date;
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
    maxDate,
    minDate,
    name,
    onChange,
    placeholder,
    readOnly,
    usePortal,
  } = props;

  const localDateFormat = dateFormat || 'MMM dd, yyyy';

  // Investigate custom input https://github.com/Hacker0x01/react-datepicker/issues/2479#issuecomment-1013838239
  return (
    <div
      className={classnames({ 'input-date-picker-wrapper-read-only': readOnly || disabled }, className)}
      onClick={
        readOnly || disabled
          ? undefined
          : (event) => {
              event.stopPropagation();
            }
      }>
      <DatePicker
        autoComplete='off'
        autoFocus={false}
        calendarStartDay={calendarStartDay}
        className={classnames({
          'input-date-picker-input-read-only': readOnly || disabled,
          'input-date-picker-input': !readOnly,
          highlighted: highlighted && (readOnly || disabled),
          'input-error': isInError && !(readOnly || disabled),
        })}
        data-testid={dataTestId}
        dateFormat={localDateFormat}
        disabled={disabled}
        disabledKeyboardNavigation
        fixedHeight
        isClearable={!(disabled || readOnly) && isClearable}
        locale={locale}
        maxDate={maxDate}
        minDate={minDate}
        name={name}
        onChange={
          onChange ||
          (() => {
            return;
          })
        }
        readOnly={readOnly}
        placeholderText={!inputValue && (readOnly || disabled) ? '-' : placeholder || localDateFormat.toUpperCase()}
        showPopperArrow={false}
        popperContainer={usePortal ? Portal : undefined}
        renderCustomHeader={DatePickerHeader(locale)}
        onClickOutside={(event) => {
          event.stopPropagation();
        }}
        preventOpenOnFocus
        selected={inputValue}
        tabIndex={readOnly || disabled ? -1 : 0}
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
  maxDate: undefined,
  minDate: undefined,
  placeholder: undefined,
  readOnly: false,
  usePortal: true,
};

export default DatePickerInput;
