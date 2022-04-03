import React, { ReactElement, Ref } from 'react';
import classnames from 'classnames';

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
    label,
    labelSize,
    mandatory,
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
      helperText={helperText}
      highlighted={highlighted}
      inline={inline}
      label={label}
      labelSize={labelSize}
      mandatory={mandatory}
      readOnly={readOnly}>
      <YearPickerInput
        className={classnames(
          'field',
          'input-year-picker-field',
          fieldSize && `field-input-size-${fieldSize}`,
          inputClassName,
        )}
        dataTestId={dataTestId}
        disabled={disabled}
        highlighted={highlighted}
        isInError={errorMessage !== undefined}
        name={name}
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
  label: undefined,
  labelSize: undefined,
  mandatory: false,
  onChange: undefined,
  placeholder: undefined,
  readOnly: false,
  usePortal: true,
};

export default YearPickerField;
