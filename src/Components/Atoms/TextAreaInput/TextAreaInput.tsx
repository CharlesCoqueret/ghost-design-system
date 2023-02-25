import React, { ReactElement } from 'react';
import classnames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';

export interface ITextAreaInputProps {
  /** For test purpose only */
  dataTestId?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Highlighted field (optional, default: false) */
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
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
}

const TextAreaInput = (props: ITextAreaInputProps): ReactElement => {
  const {
    dataTestId,
    disabled,
    isInError,
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

  /**
   * Handler of changes
   *
   * @param event input event
   */
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className={classnames('field', 'gds-input-textarea-parent')}>
      <TextareaAutosize
        onChange={onChangeHandler}
        className={classnames(
          { 'input-textarea-field': !readOnly },
          { 'input-textarea-field-read-only': readOnly },
          {
            'input-error': isInError && !disabled,
          },
          {
            'field-highlighted': highlighted,
          },
          inputClassName,
        )}
        data-testid={dataTestId}
        id={name}
        name={name}
        placeholder={!inputValue && (readOnly || disabled) ? '-' : placeholder}
        minRows={3}
        maxRows={10}
        maxLength={maxLength}
        minLength={minLength}
        disabled={disabled}
        readOnly={readOnly}
        value={inputValue}
      />
    </div>
  );
};

TextAreaInput.defaultProps = {
  disabled: false,
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

export default TextAreaInput;
