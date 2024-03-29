import React, { ReactElement } from 'react';
import DatePicker from 'react-datepicker';
import classnames from 'classnames';

import YearPickerHeader from './YearPickerHeader';
import { Portal } from '../Portal';

import styles from './DatePickerInput.module.scss';

export interface IYearPickerProps {
  /** Class for the input (optional, default: undefined) */
  className?: string;
  /** For test purpose only */
  dataTestId?: string;
  /** Disabled input (optional, default: false) */
  disabled?: boolean;
  /** Highlight value in readonly mode (optional, default: false) */
  highlighted?: boolean;
  /** Input year value (optional, default: undefined) */
  input?: number;
  /** Ability to clear the value (optional, default: false) */
  isClearable?: boolean;
  /** Is in Error (optional, default: false) */
  isInError?: boolean;
  /** Maximum date that can be picked (optional, default: undefined) */
  maxDate?: Date;
  /** Minimum date that can be picked (optional, default: undefined) */
  minDate?: Date;
  /** Handler of value changes (optional, default: undefined) */
  /** Name of year picker input (optional, default: undefined) */
  name?: string;
  onChange?: (date?: number) => void;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only input (optional, default: false) */
  readOnly?: boolean;
  /** Use portal, it is remmended to set it to false for modal (optional, default true) */
  usePortal?: boolean;
}

const YearPickerInput = (props: IYearPickerProps): ReactElement => {
  const {
    className,
    dataTestId,
    disabled,
    highlighted,
    input,
    isClearable,
    isInError,
    maxDate,
    minDate,
    name,
    onChange,
    placeholder,
    readOnly,
    usePortal,
  } = props;

  const dateFormat = 'yyyy';

  const handleChange = (date: Date | undefined | null) => {
    if (onChange) {
      onChange(date?.getFullYear() || undefined);
    }
  };

  const today = new Date();
  if (input) {
    today.setFullYear(input);
  }
  const selected = input ? today : undefined;

  return (
    <div
      className={classnames(
        styles.container,
        { 'input-year-picker-wrapper-read-only': readOnly || disabled },
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
        className={classnames({
          'input-year-picker-input-read-only': readOnly,
          'input-year-picker-input': !readOnly,
          'field-highlighted': highlighted && readOnly,
          'input-error': isInError && !readOnly && !disabled,
        })}
        data-testid={dataTestId}
        dateFormat={dateFormat}
        disabled={disabled}
        disabledKeyboardNavigation
        fixedHeight
        isClearable={!(disabled || readOnly) && isClearable}
        maxDate={maxDate}
        minDate={minDate}
        name={name}
        onChange={handleChange}
        onClickOutside={(event) => {
          event.stopPropagation();
        }}
        placeholderText={!input && (readOnly || disabled) ? '-' : placeholder || dateFormat.toUpperCase()}
        popperContainer={usePortal ? Portal : undefined}
        preventOpenOnFocus
        readOnly={readOnly}
        renderCustomHeader={YearPickerHeader}
        selected={selected}
        showYearPicker
        showPopperArrow={false}
        tabIndex={readOnly || disabled ? -1 : 0}
      />
    </div>
  );
};

YearPickerInput.defaultProps = {
  calendarStartDay: 1,
  className: undefined,
  dateValue: undefined,
  disabled: false,
  highlighted: false,
  isClearable: false,
  isInError: false,
  name: undefined,
  maxDate: undefined,
  minDate: undefined,
  placeholder: undefined,
  readOnly: false,
  usePortal: true,
};

export default YearPickerInput;
