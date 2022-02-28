import React, { ReactElement } from 'react';
import DatePicker from 'react-datepicker';
import classnames from 'classnames';

import YearPickerHeader from './YearPickerHeader';

export interface IYearPickerProps {
  /** Class for the input (optional, default: undefined) */
  className?: string;
  /** Disabled input (optional, default: false) */
  disabled?: boolean;
  /** Highlight value in readonly mode (optional, default: false) */
  highlighted?: boolean;
  /** Input year value (optional, default: undefined) */
  inputValue?: number;
  /** Ability to clear the value (optional, default: false) */
  isClearable?: boolean;
  /** Is in Error (optional, default: false) */
  isInError?: boolean;
  /** Name of year picker input */
  name: string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (date: number | undefined) => void;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only input (optional, default: false) */
  readOnly?: boolean;
}

const YearPickerInput = (props: IYearPickerProps): ReactElement => {
  const {
    className,
    disabled,
    highlighted,
    inputValue,
    isClearable,
    isInError,
    name,
    onChange,
    placeholder,
    readOnly,
  } = props;

  const dateFormat = 'yyyy';

  const handleChange = (date: Date | undefined | null) => {
    if (onChange) {
      onChange(date?.getFullYear());
    }
  };

  const today = new Date();
  if (inputValue) {
    today.setFullYear(inputValue);
  }
  const selected = inputValue ? today : undefined;

  return (
    <div className={className}>
      <DatePicker
        name={name}
        selected={selected}
        className={classnames('field', {
          'input-year-picker-input-read-only': readOnly,
          'input-year-picker-input': !readOnly,
          'field-highlighted': highlighted && readOnly,
          'input-error': isInError && !readOnly && !disabled,
        })}
        autoFocus={false}
        preventOpenOnFocus
        onChange={handleChange}
        disabled={disabled}
        fixedHeight
        readOnly={readOnly}
        isClearable={!disabled && isClearable}
        placeholderText={readOnly ? '-' : placeholder || dateFormat?.toUpperCase()}
        dateFormat={dateFormat}
        tabIndex={1}
        disabledKeyboardNavigation
        showPopperArrow={false}
        renderCustomHeader={YearPickerHeader}
        autoComplete='off'
        showYearPicker
      />
    </div>
  );
};

YearPickerInput.defaultProps = {
  calendarStartDay: 1,
  className: undefined,
  dateValue: undefined,
  isInError: false,
  isClearable: false,
  highlighted: false,
  readOnly: false,
  placeholder: undefined,
  disabled: false,
};

export default YearPickerInput;
