import React, { ReactElement } from 'react';
import classNames from 'classnames';

export interface ITextInputProps {
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  fieldSize?: number;
  /** Highlighted field (optional, default: false) */
  highlighted?: boolean;
  /** Class for the input (optional, default: undefined) */
  inputClassName?: string;
  /** Input string value (optional, default: undefined) */
  inputValue?: string;
  /** Is in Error (optional, default: false) */
  isInError?: boolean;
  /** Maximum length of the textfield (optional, default: undefined) */
  maxLength?: number;
  /** Minimum length of textfield (optional, default: undefined) */
  minLength?: number;
  /** Name of text field */
  name: string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
}

const TextInput = (props: ITextInputProps): ReactElement => {
  const {
    disabled,
    isInError,
    fieldSize,
    highlighted,
    inputClassName,
    inputValue,
    maxLength,
    minLength,
    name,
    onChange,
    placeholder,
    readOnly,
  } = props;

  if (readOnly)
    return (
      <div
        className={classNames(
          inputClassName,
          'field',
          'input-text-field-read-only',
          fieldSize && `field-input-size-${fieldSize}`,
          highlighted && `field-highlighted`,
        )}>
        {inputValue}
      </div>
    );

  return (
    <input
      className={classNames(inputClassName, 'field', 'input-text-field', fieldSize && `field-input-size-${fieldSize}`, {
        'input-error': isInError,
      })}
      id={name}
      name={name}
      type='text'
      placeholder={placeholder}
      maxLength={maxLength}
      minLength={minLength}
      onChange={onChange}
      disabled={disabled}
      readOnly={readOnly}
      value={inputValue}
    />
  );
};

TextInput.defaultProps = {
  disabled: false,
  fieldSize: undefined,
  highlighted: false,
  inputClassName: undefined,
  inputValue: undefined,
  isInError: false,
  maxLength: undefined,
  minLength: undefined,
  onChange: undefined,
  placeholder: undefined,
  readOnly: false,
};

export default TextInput;
