import React, { useState } from 'react';

import { GenericField } from '../../Atoms/GenericField';
import { TextInput } from '../../Atoms/';

export interface ITextFieldProps {
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
  /** Input string value (optional, default: undefined) */
  inputValue?: string;
  /** Label (optional, default: undefined) */
  label?: string;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  labelSize?: number;
  /** Mandatory field (optional, default: false) */
  mandatory?: boolean;
  /** Maximum length of the textfield (optional, default: undefined) */
  maxLength?: number;
  /** Minimum length of textfield (optional, default: undefined) */
  minLength?: number;
  /** Name of text field */
  name: string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (newValue: string) => void;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
}

/**
 * Text field component
 *
 * Text field wrapped in a generic field ( @see GenericField ).
 *
 * Calls @param onChange for every input change.
 *
 * When the @param maxLength , the letter counter is displayed.
 */
export const TextField = (props: ITextFieldProps): React.ReactElement => {
  const {
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
    maxLength,
    minLength,
    name,
    onChange,
    placeholder,
    readOnly,
  } = props;

  const [inputLength, setInputLength] = useState<number>(inputValue ? inputValue.toString().length : 0);

  /**
   * Handler of changes
   *
   * @param event input event
   */
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputLength(event.target.value.length);
    if (onChange) {
      onChange(event.target.value);
    }
  };

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
      readOnly={readOnly}
      maxLength={maxLength}
      inputLength={inputLength}>
      <TextInput
        disabled={disabled}
        fieldSize={fieldSize}
        highlighted={highlighted}
        inputClassName={inputClassName}
        inputValue={inputValue}
        isInError={errorMessage !== undefined}
        maxLength={maxLength}
        minLength={minLength}
        name={name}
        onChange={onChangeHandler}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </GenericField>
  );
};

TextField.defaultProps = {
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
  maxLength: undefined,
  minLength: undefined,
  onChange: undefined,
  placeholder: undefined,
  readOnly: false,
};

export default TextField;
