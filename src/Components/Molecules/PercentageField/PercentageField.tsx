import React, { ReactElement, Ref } from 'react';

import { GenericField } from '../../Atoms/GenericField';
import { AmountInput, ThousandsGroupStyle } from '../../Atoms/AmountInput';

export interface IPercentageFieldProps {
  /** Allows negative values (optional, default: true) */
  allowNegative?: boolean;
  /** React Container ref (optional, default: undefined) */
  containerRef?: Ref<HTMLDivElement>;
  /** For test purpose only */
  dataTestId?: string;
  /** Decimal scale (optional, default: 2) */
  decimalScale?: number;
  /** Decimal separator (optional, default: '.') */
  decimalSeparator?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Ellipsis in readonly (optional, default: false) */
  ellipsis?: boolean;
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
  /** Input number value (optional, default: undefined) */
  input?: string | number;
  /** Label (optional, default: undefined) */
  label?: string;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  labelSize?: number;
  /** Mandatory field (optional, default: false) */
  mandatory?: boolean;
  /** Max value (optional, default: undefined) */
  maxValue?: number;
  /** Min value (optional, default: undefined) */
  minValue?: number;
  /** Name of text field (optional, default: undefined) */
  name?: string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (value: number | undefined) => void;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
  /** Thousand separator (optional, default: ',')*/
  thousandSeparator?: string;
  /** Thousands grouping style (default: ThousandsGroupStyle.THOUSAND )*/
  thousandsGroupStyle?: ThousandsGroupStyle;
}

/**
 * Percentage field component
 *
 * Date picker input wrapped in a generic field ( @see GenericField ).
 *
 * Calls @param onChange for every input change.
 *
 */
export const PercentageField = (props: IPercentageFieldProps): ReactElement => {
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
    readOnly,
    thousandSeparator,
    thousandsGroupStyle,
  } = props;

  const handleChange = (value: number | undefined) => {
    if (!onChange) {
      return;
    }
    if (!value) {
      onChange(undefined);
      return;
    }
    onChange(value / 100);
  };

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
        input={typeof input === 'string' ? parseFloat(input) * 100 : typeof input === 'number' ? input * 100 : input}
        isInError={errorMessage !== undefined}
        maxValue={maxValue}
        minValue={minValue}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={readOnly}
        suffix='%'
        thousandSeparator={thousandSeparator}
        thousandsGroupStyle={thousandsGroupStyle}
      />
    </GenericField>
  );
};

PercentageField.defaultProps = {
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
  readOnly: false,
  thousandSeparator: ',',
  thousandsGroupStyle: ThousandsGroupStyle.THOUSAND,
};

export default PercentageField;
