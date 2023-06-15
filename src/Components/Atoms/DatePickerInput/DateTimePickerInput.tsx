import React, { ReactElement } from 'react';
import DatePicker from 'react-datepicker';
import classnames from 'classnames';

import DatePickerHeader from './DatePickerHeader';
import { TimeFormat, WeekDayEnum } from './types';
import { Portal } from '../Portal';

import styles from './DatePickerInput.module.scss';
import { IDatePickerProps } from './DatePickerInput';

export interface IDateTimePickerProps extends IDatePickerProps {
  /** Time format */
  timeFormat: TimeFormat;
}

const DateTimePickerInput = (props: IDateTimePickerProps): ReactElement => {
  const {
    calendarStartDay,
    className,
    dataTestId,
    dateFormat,
    disabled,
    highlighted,
    input,
    isClearable,
    isInError,
    locale,
    maxDate,
    minDate,
    name,
    onChange,
    placeholder,
    readOnly,
    timeFormat,
    usePortal,
  } = props;

  const localDateFormat = dateFormat || 'MMM dd, yyyy';

  // Investigate custom input https://github.com/Hacker0x01/react-datepicker/issues/2479#issuecomment-1013838239
  return (
    <div
      className={classnames(
        styles.container,
        { 'input-date-picker-wrapper-read-only': readOnly || disabled },
        className,
      )}
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
        dateFormat={`${localDateFormat} ${timeFormat}`}
        disabled={disabled}
        disabledKeyboardNavigation
        fixedHeight
        isClearable={!(disabled || readOnly) && isClearable}
        locale={locale}
        maxDate={maxDate}
        minDate={minDate}
        name={name}
        onChange={(value) => {
          if (onChange) {
            onChange(value || undefined);
          }
        }}
        onClickOutside={(event) => {
          event.stopPropagation();
        }}
        placeholderText={!input && (readOnly || disabled) ? '-' : placeholder || localDateFormat.toUpperCase()}
        popperContainer={usePortal ? Portal : undefined}
        preventOpenOnFocus
        readOnly={readOnly}
        renderCustomHeader={DatePickerHeader(locale)}
        showPopperArrow={false}
        showTimeInput={true}
        selected={input || null}
        tabIndex={readOnly || disabled ? -1 : 0}
      />
    </div>
  );
};

DateTimePickerInput.defaultProps = {
  calendarStartDay: WeekDayEnum.MONDAY,
  className: undefined,
  dateValue: undefined,
  disabled: false,
  highlighted: false,
  isClearable: false,
  isInError: false,
  locale: undefined,
  name: undefined,
  maxDate: undefined,
  minDate: undefined,
  placeholder: undefined,
  readOnly: false,
  usePortal: true,
};

export default DateTimePickerInput;
