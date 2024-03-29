import React, { ReactElement, Ref } from 'react';

import { GenericField } from '../../Atoms/GenericField';
import { DatePickerInput } from '../../Atoms/DatePickerInput';
import { IDatePickerProps } from '../../Atoms/DatePickerInput/DatePickerInput';

export interface IDatePickerFieldProps extends Omit<IDatePickerProps, 'className' | 'isInError'> {
  /** React Container ref (optional, default: undefined) */
  containerRef?: Ref<HTMLDivElement>;
  /** Error message (optional, default: undefined) */
  errorMessage?: string;
  /** Class for the field surrounding the input (optional, default: undefined) */
  fieldClassName?: string;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  fieldSize?: number;
  /** Helper text (optional, default: undefined) */
  helperText?: string;
  /** Inline field (optional, default: false) */
  inline?: boolean;
  /** Class for the input (optional, default: undefined) */
  inputClassName?: string;
  /** Label (optional, default: undefined) */
  label?: string;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  labelSize?: number;
  /** Mandatory field (optional, default: false) */
  mandatory?: boolean;
}

/**
 * Date picker field component
 *
 * Date picker input wrapped in a generic field ( @see GenericField ).
 *
 * Calls @param onChange for every input change.
 *
 */
export const DatePickerField = (props: IDatePickerFieldProps): ReactElement => {
  const {
    calendarStartDay,
    containerRef,
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
    input,
    isClearable,
    label,
    labelSize,
    locale,
    mandatory,
    maxDate,
    minDate,
    name,
    onChange,
    placeholder,
    readOnly,
    usePortal,
  } = props;

  return (
    <GenericField
      containerRef={containerRef}
      errorMessage={errorMessage}
      fieldClassName={fieldClassName}
      fieldSize={fieldSize}
      helperText={helperText}
      highlighted={highlighted}
      inline={inline}
      label={label}
      labelSize={labelSize}
      mandatory={mandatory}
      readOnly={readOnly}>
      <DatePickerInput
        calendarStartDay={calendarStartDay}
        className={inputClassName}
        dataTestId={dataTestId}
        dateFormat={dateFormat}
        disabled={disabled}
        highlighted={highlighted}
        isInError={errorMessage !== undefined}
        isClearable={isClearable}
        locale={locale}
        maxDate={maxDate}
        minDate={minDate}
        name={name}
        placeholder={placeholder}
        input={input}
        onChange={onChange}
        readOnly={readOnly}
        usePortal={usePortal}
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
  input: undefined,
  isClearable: false,
  label: undefined,
  labelSize: undefined,
  mandatory: false,
  maxDate: undefined,
  minDate: undefined,
  name: undefined,
  onChange: undefined,
  placeholder: undefined,
  readOnly: false,
  usePortal: true,
};

export default DatePickerField;
