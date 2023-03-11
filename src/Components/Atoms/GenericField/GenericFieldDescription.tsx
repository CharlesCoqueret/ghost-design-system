import React, { ReactElement } from 'react';
import classnames from 'classnames';

import styles from './GenericFieldDescription.module.scss';

interface IGenericFieldDescriptionProps {
  /** Error message (optional, default: undefined) */
  errorMessage?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Helper text (optional, default: undefined) */
  helperText?: string;
  /** Inline field (optional, default: false) */
  inline?: boolean;
  /** Input string value (optional, default: 0) */
  inputLength?: number;
  /** Invert input and description order, speicfic for switches and checkbox (optional, default: false) */
  invertInputDescription?: boolean;
  /** Maximum length of the textfield (optional, default: undefined) */
  maxLength?: number;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
}

const message = (props: IGenericFieldDescriptionProps): ReactElement => {
  const { errorMessage, disabled, helperText, inputLength, maxLength, readOnly } = props;

  if (errorMessage && !(readOnly || disabled)) {
    return <div className={classnames(styles.error, 'field-error')}>{errorMessage}</div>;
  }

  return (
    <>
      {helperText && <div className={styles.helper}>{helperText}</div>}
      {!readOnly && maxLength && <div className={styles.counter}>{`${inputLength} / ${maxLength}`}</div>}
    </>
  );
};

/**
 * Generic field description
 *
 * Does nothing in inline mode.
 * Does nothing in readonly or disabled when there is no helper text (max length and error are not available).
 * Does nothing when there is no helper text, error nor max length.
 * Displays an error message if there is an error message.
 * Displays a helper message if defined.
 * Displays a counter if the input length and max length are defined.
 *
 */
const GenericFieldDescription = (props: IGenericFieldDescriptionProps): ReactElement => {
  const { disabled, errorMessage, helperText, inline, invertInputDescription, maxLength, readOnly } = props;

  if (inline || (!helperText && !maxLength && !errorMessage) || ((disabled || readOnly) && !helperText)) return <></>;

  return (
    <div className={classnames(styles.message, { [styles.inverted]: invertInputDescription })}>{message(props)}</div>
  );
};

GenericFieldDescription.defaultProps = {
  errorMessage: undefined,
  disabled: false,
  helperText: undefined,
  inline: false,
  invertInputDescription: false,
  inputLength: 0,
  maxLength: undefined,
  readOnly: false,
};

export default GenericFieldDescription;
