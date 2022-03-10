import React from 'react';
import classnames from 'classnames';

import { GenericField, DatePickerInput, WeekDayEnum, DateFormat } from '../../Atoms';

export interface IDatePickerFieldProps {
  /** Calendar start week day (optional: default: WeekDayEnum.MONDAY )  */
  calendarStartDay?: WeekDayEnum;
  /** For test purpose only */
  dataTestId?: string;
  /** Date format */
  dateFormat?: DateFormat;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Error message (optional, default: undefined) */
  errorMessage?: string;
  /** Class for the field surrounding the input (optional, default: undefined) */
  fieldClassName?: string;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  fieldSize?: number;
  /** Helper text (optional, default: undefined) */
  helperText?: string;
  /** Highlighted field (optional, default: false) */
  highlighted?: boolean;
  /** Inline field (optional, default: false) */
  inline?: boolean;
  /** Class for the input (optional, default: undefined) */
  inputClassName?: string;
  /** Input date value (optional, default: undefined) */
  inputValue?: Date | null;
  /** Provide the ability to clear the value (optional, default: false) */
  isClearable?: boolean;
  /** Label (optional, default: undefined) */
  label?: string;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  labelSize?: number;
  /** Locale to display months and day (optional, default: undefined) */
  locale?: string;
  /** Mandatory field (optional, default: false) */
  mandatory?: boolean;
  /** Name of text field */
  name: string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (date: Date | null) => void;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
}

/**
 * Date picker field component
 *
 * Date picker input wrapped in a generic field ( @see GenericField ).
 *
 * Calls @param onChange for every input change.
 *
 */
export const DatePickerField = (props: IDatePickerFieldProps): React.ReactElement => {
  const {
    calendarStartDay,
    dataTestId,
    dateFormat,
    disabled,
    errorMessage,
    fieldClassName,
    fieldSize,
    helperText,
    highlighted,
    inline,
    inputClassName,
    inputValue,
    isClearable,
    label,
    labelSize,
    mandatory,
    name,
    onChange,
    placeholder,
    readOnly,
  } = props;

  return (
    <GenericField
      errorMessage={errorMessage}
      fieldClassName={fieldClassName}
      helperText={helperText}
      highlighted={highlighted}
      inline={inline}
      label={label}
      labelSize={labelSize}
      mandatory={mandatory}
      readOnly={readOnly}>
      <DatePickerInput
        calendarStartDay={calendarStartDay}
        className={classnames(
          'field',
          'input-date-picker-field',
          fieldSize && `field-input-size-${fieldSize}`,
          inputClassName,
        )}
        dataTestId={dataTestId}
        dateFormat={dateFormat}
        disabled={disabled}
        highlighted={highlighted}
        isInError={errorMessage !== undefined}
        isClearable={isClearable}
        name={name}
        placeholder={placeholder}
        inputValue={inputValue}
        onChange={onChange}
        readOnly={readOnly}
      />
    </GenericField>
  );
};

DatePickerField.defaultProps = {
  disabled: false,
  errorMessage: undefined,
  fieldClassName: undefined,
  fieldSize: undefined,
  helperText: undefined,
  highlighted: false,
  inline: false,
  inputClassName: undefined,
  inputValue: undefined,
  isClearable: false,
  label: undefined,
  labelSize: undefined,
  mandatory: false,
  onChange: undefined,
  placeholder: undefined,
  readOnly: false,
};

export default DatePickerField;
