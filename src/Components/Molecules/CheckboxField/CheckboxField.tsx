import React, { ReactElement, Ref } from 'react';
import classnames from 'classnames';

import { GenericField } from '../../Atoms/GenericField';
import { IToggleEntry, CheckboxInput } from '../../Atoms/CheckBoxInput';

export interface ICheckboxFieldProps {
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
  /** Highlighted field and highlight the toggle entries marked as highlight (optional, default: false) */
  highlighted?: boolean;
  /** Inline field (optional, default: false) */
  inline?: boolean;
  /** Class for the input (optional, default: undefined) */
  inputClassName?: string;
  /** Input value */
  inputValue: Array<IToggleEntry>;
  /** Label (optional, default: undefined) */
  label?: string;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  labelSize?: number;
  /** Mandatory field (optional, default: false) */
  mandatory?: boolean;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (values: Array<IToggleEntry>) => void;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
}

/**
 * Checkbox field component
 *
 * Checbox input wrapped in a generic field ( @see GenericField ).
 *
 * Calls @param onChange for every input change.
 *
 */
export const CheckboxField = (props: ICheckboxFieldProps): ReactElement => {
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
    onChange,
    readOnly,
  } = props;

  return (
    <GenericField
      containerRef={containerRef}
      errorMessage={errorMessage}
      fieldClassName={fieldClassName}
      helperText={helperText}
      highlighted={highlighted}
      inline={inline}
      invertInputDescription
      label={label}
      labelSize={labelSize}
      mandatory={mandatory}
      readOnly={readOnly}>
      <CheckboxInput
        className={classnames(
          'field',
          'input-checkbox-field',
          fieldSize && `field-input-size-${fieldSize}`,
          inputClassName,
        )}
        dataTestId={dataTestId}
        disabled={disabled}
        highlighted={highlighted}
        isInError={errorMessage !== undefined}
        options={inputValue}
        onChange={onChange}
        readOnly={readOnly}
      />
    </GenericField>
  );
};

CheckboxField.defaultProps = {
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

export default CheckboxField;
