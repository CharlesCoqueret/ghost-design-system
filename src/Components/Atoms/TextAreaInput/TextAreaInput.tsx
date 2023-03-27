import React, { ReactElement } from 'react';
import classnames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';

import styles from './TextAreaInput.module.scss';

export interface ITextAreaInputProps {
  /** Class for the input (optional, default: undefined) */
  className?: string;
  /** For test purpose only */
  dataTestId?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Highlighted field (optional, default: false) */
  highlighted?: boolean;
  /** Input string value (optional, default: '') */
  input?: string;
  /** Is in Error (optional, default: false) */
  isInError?: boolean;
  /** Maximum length of the textfield (optional, default: undefined) */
  maxLength?: number;
  /** Minimum length of textfield (optional, default: undefined) */
  minLength?: number;
  /** Name of text field (optional, default: undefined) */
  name?: string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
}

const TextAreaInput = (props: ITextAreaInputProps): ReactElement => {
  const {
    className,
    dataTestId,
    disabled,
    isInError,
    highlighted,
    input,
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
    <div className={styles.container}>
      <TextareaAutosize
        onChange={onChangeHandler}
        className={classnames(
          styles.textarea,
          {
            [styles.readOnly]: readOnly,
            [styles.disabled]: disabled,
            [styles.error]: isInError && !(disabled || readOnly),
            [styles.highlighted]: (readOnly || disabled) && highlighted,
          },
          className,
        )}
        data-testid={dataTestId}
        id={name}
        name={name}
        placeholder={!input && (readOnly || disabled) ? '-' : placeholder}
        minRows={3}
        maxRows={10}
        maxLength={maxLength}
        minLength={minLength}
        disabled={disabled}
        readOnly={readOnly}
        value={input}
      />
    </div>
  );
};

TextAreaInput.defaultProps = {
  className: undefined,
  disabled: false,
  highlighted: false,
  input: '',
  isInError: false,
  maxLength: undefined,
  minLength: undefined,
  name: undefined,
  onChange: undefined,
  placeholder: undefined,
  readOnly: false,
};

export default TextAreaInput;
