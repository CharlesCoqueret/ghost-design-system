import React, { ReactElement, Ref } from 'react';

import { GenericField } from '../../Atoms/GenericField';
import { SwitchInput } from '../../Atoms/SwitchInput';
import { ISwitchInputProps } from '../../Atoms/SwitchInput/SwitchInput';

export interface ISwitchFieldProps extends Omit<ISwitchInputProps, 'className' | 'isInError'> {
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
 * Switch field component
 *
 * Switch input wrapped in a generic field ( @see GenericField ).
 *
 * Calls @param onChange for every input change.
 *
 */
export const SwitchField = (props: ISwitchFieldProps): ReactElement => {
  const {
    containerRef,
    dataTestId,
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
    name,
    onChange,
    readOnly,
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
      invertInputDescription
      label={label}
      labelSize={labelSize}
      mandatory={mandatory}
      readOnly={readOnly}>
      <SwitchInput
        className={inputClassName}
        dataTestId={dataTestId}
        disabled={disabled}
        ellipsis={ellipsis}
        highlighted={highlighted}
        inline={inline}
        input={input}
        isInError={errorMessage !== undefined}
        name={name}
        onChange={onChange}
        readOnly={readOnly}
      />
    </GenericField>
  );
};

SwitchField.defaultProps = {
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
  onChange: undefined,
  placeholder: undefined,
  readOnly: false,
};

export default SwitchField;
