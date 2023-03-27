import React, { ReactElement } from 'react';
import classnames from 'classnames';
import { Typography } from '../Typography';

import styles from './TextInput.module.scss';

export interface ITextInputProps {
  /** Class for the input (optional, default: undefined) */
  className?: string;
  /** For test purpose only */
  dataTestId?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Ellipsis in readonly (optional, default: false) */
  ellipsis?: boolean;
  /** Highlight value in readonly mode (optional, default: false) */
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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
}

const TextInput = (props: ITextInputProps): ReactElement => {
  const {
    className,
    dataTestId,
    disabled,
    ellipsis,
    highlighted,
    isInError,
    input,
    maxLength,
    minLength,
    name,
    onChange,
    placeholder,
    readOnly,
  } = props;

  if (readOnly || disabled)
    return (
      <Typography.Text
        ellipsis={ellipsis}
        className={classnames(
          {
            [styles.highlighted]: (readOnly || disabled) && highlighted,
          },
          className,
        )}
        data-testid={dataTestId}>
        {input ? input : '-'}
      </Typography.Text>
    );

  return (
    <input
      autoComplete='off'
      className={classnames(
        styles.container,
        {
          [styles.error]: isInError && !disabled,
          [styles.disabled]: disabled,
          [styles.highlighted]: (readOnly || disabled) && highlighted,
        },
        className,
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
      value={input}
    />
  );
};

TextInput.defaultProps = {
  className: undefined,
  disabled: false,
  ellipsis: false,
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

export default TextInput;
