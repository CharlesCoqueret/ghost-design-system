import React, { ReactElement, Ref } from 'react';

import { GenericField } from '../../Atoms/GenericField';
import { YearPickerInput } from '../../Atoms/DatePickerInput';

export interface IYearPickerFieldProps {
  /** React Container ref (optional, default: undefined) */
  containerRef?: Ref<HTMLDivElement>;
  /** For test purpose only */
  dataTestId?: string;
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
  /** Input year value (optional, default: undefined) */
  inputValue?: number;
  /** Provide the ability to clear the value (optional, default: false) */
  isClearable?: boolean;
  /** Label (optional, default: undefined) */
  label?: string;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  labelSize?: number;
  /** Mandatory field (optional, default: false) */
  mandatory?: boolean;
  /** Maximum date that can be picked (optional, default: undefined) */
  maxDate?: Date;
  /** Minimum date that can be picked (optional, default: undefined) */
  minDate?: Date;
  /** Name of text field (optional, default: false) */
  name?: string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (year: number | undefined) => void;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
  /** Use portal, it is remmended to set it to false for modal (optional, default true) */
  usePortal?: boolean;
}

/**
 * Date picker field component
 *
 * Date picker input wrapped in a generic field ( @see GenericField ).
 *
 * Calls @param onChange for every input change.
 *
 */
export const YearPickerField = (props: IYearPickerFieldProps): ReactElement => {
  const {
    containerRef,
    dataTestId,
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
      <YearPickerInput
        className={inputClassName}
        dataTestId={dataTestId}
        disabled={disabled}
        highlighted={highlighted}
        isInError={errorMessage !== undefined}
        isClearable={isClearable}
        name={name}
        maxDate={maxDate}
        minDate={minDate}
        placeholder={placeholder}
        inputValue={inputValue}
        onChange={onChange}
        readOnly={readOnly}
        usePortal={usePortal}
      />
    </GenericField>
  );
};

YearPickerField.defaultProps = {
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
  name: undefined,
  mandatory: false,
  maxDate: undefined,
  minDate: undefined,
  onChange: undefined,
  placeholder: undefined,
  readOnly: false,
  usePortal: true,
};

export default YearPickerField;
