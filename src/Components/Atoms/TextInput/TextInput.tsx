import React, { ReactElement } from 'react';
import classnames from 'classnames';

export interface ITextInputProps {
  /** For test purpose only */
  dataTestId?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  fieldSize?: number;
  /** Highlight value in readonly mode (optional, default: false) */
  highlighted?: boolean;
  /** Class for the input (optional, default: undefined) */
  inputClassName?: string;
  /** Input string value (optional, default: '') */
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
    dataTestId,
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
        className={classnames(
          'field',
          'input-text-field-read-only',
          fieldSize && `field-input-size-${fieldSize}`,
          {
            'field-highlighted': highlighted,
          },
          inputClassName,
        )}
        data-testid={dataTestId}>
        {inputValue}
      </div>
    );

  return (
    <input
      className={classnames(
        'field',
        'gds-input-text-field',
        fieldSize && `field-input-size-${fieldSize}`,
        {
          'input-error': isInError && !disabled,
        },
        inputClassName,
      )}
      data-testid={dataTestId}
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
  inputValue: '',
  isInError: false,
  maxLength: undefined,
  minLength: undefined,
  onChange: undefined,
  placeholder: undefined,
  readOnly: false,
};

export default TextInput;
