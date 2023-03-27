import React, { ReactElement, Ref } from 'react';

import { AmountInput, ThousandsGroupStyle } from '../../Atoms/AmountInput';
import { IAmountInputProps } from '../../Atoms/AmountInput/AmountInput';
import { GenericField } from '../../Atoms/GenericField';

export interface IAmountFieldProps extends Omit<IAmountInputProps, 'className' | 'isInError'> {
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
 * Amount field component
 *
 * Amount picker input wrapped in a generic field ( @see GenericField ).
 *
 * Calls @param onChange for every input change.
 *
 */
export const AmountField = (props: IAmountFieldProps): ReactElement => {
  const {
    allowNegative,
    containerRef,
    dataTestId,
    decimalScale,
    decimalSeparator,
    disabled,
    ellipsis,
    errorMessage,
    fieldClassName,
    fieldSize,
    helperText,
    highlighted,
    inline,
    inputClassName,
    input,
    label,
    labelSize,
    mandatory,
    maxValue,
    minValue,
    name,
    onChange,
    placeholder,
    prefix,
    readOnly,
    suffix,
    thousandSeparator,
    thousandsGroupStyle,
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
      <AmountInput
        allowNegative={allowNegative}
        className={inputClassName}
        dataTestId={dataTestId}
        decimalScale={decimalScale}
        decimalSeparator={decimalSeparator}
        disabled={disabled}
        ellipsis={ellipsis}
        highlighted={highlighted}
        input={input}
        isInError={errorMessage !== undefined}
        maxValue={maxValue}
        minValue={minValue}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        prefix={prefix}
        readOnly={readOnly}
        suffix={suffix}
        thousandSeparator={thousandSeparator}
        thousandsGroupStyle={thousandsGroupStyle}
      />
    </GenericField>
  );
};

AmountField.defaultProps = {
  allowNegative: true,
  decimalScale: 2,
  decimalSeparator: '.',
  disabled: false,
  ellipsis: false,
  errorMessage: undefined,
  fieldClassName: undefined,
  fieldSize: undefined,
  helperText: undefined,
  highlighted: false,
  inline: false,
  inputClassName: undefined,
  input: undefined,
  label: undefined,
  labelSize: undefined,
  mandatory: false,
  maxValue: undefined,
  minValue: undefined,
  name: undefined,
  onChange: undefined,
  placeholder: undefined,
  prefix: undefined,
  readOnly: false,
  suffix: undefined,
  thousandSeparator: ',',
  thousandsGroupStyle: ThousandsGroupStyle.THOUSAND,
};

export default AmountField;
