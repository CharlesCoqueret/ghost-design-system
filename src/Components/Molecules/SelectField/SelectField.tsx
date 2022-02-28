import React from 'react';
import classnames from 'classnames';

import { IOption } from './types';
import { GenericField, Select } from '../../Atoms';

export interface ISelectFieldProps {
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Empty option available */
  emptyOption?: boolean;
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
  /** Input string value (optional, default: undefined) */
  inputValue: IOption | undefined;
  /** Provide the ability to clear the value (optional, default: false) */
  isClearable?: boolean;
  /** Label (optional, default: undefined) */
  label?: string;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  labelSize?: number;
  /** Mandatory field (optional, default: false) */
  mandatory?: boolean;
  /** Name of text field */
  name: string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (newValue: IOption | null | undefined) => void;
  /** Options available to be picked from */
  options: Array<IOption>;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
}

/**
 * Select field component
 *
 * Select field wrapped in a generic field ( @see GenericField ).
 *
 * Calls @param onChange for every input change.
 *
 */
export const SelectField = (props: ISelectFieldProps): React.ReactElement => {
  const {
    disabled,
    // emptyOption,
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
    options,
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
      <Select
        className={classnames(
          inputClassName,
          'field',
          'input-select-field',
          fieldSize && `field-input-size-${fieldSize}`,
        )}
        isInError={errorMessage !== undefined}
        isClearable={isClearable}
        name={name}
        placeholder={placeholder}
        options={options}
        disabled={disabled}
        selectedOption={inputValue}
        onChange={onChange}
        readOnly={readOnly}
      />
    </GenericField>
  );
};

SelectField.defaultProps = {
  disabled: false,
  emptyOption: false,
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

export default SelectField;
