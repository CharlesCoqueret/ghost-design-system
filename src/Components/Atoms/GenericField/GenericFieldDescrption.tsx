import React, { ReactElement } from 'react';

interface IGenericFieldDescriptionProps {
  /** Error message (optional, default: undefined) */
  errorMessage?: string;
  /** Helper text (optional, default: undefined) */
  helperText?: string;
  /** Inline field (optional, default: false) */
  inline?: boolean;
  /** Input string value (optional, default: 0) */
  inputLength?: number;
  /** Maximum length of the textfield (optional, default: undefined) */
  maxLength?: number;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
}

const message = ({
  helperText,
  inputLength,
  maxLength,
  errorMessage,
  readOnly,
}: IGenericFieldDescriptionProps): ReactElement => {
  if (!readOnly && errorMessage) {
    return <div className='field-error-message'>{errorMessage}</div>;
  }

  return (
    <>
      <div className='field-helper-text'>{helperText}</div>
      {!readOnly && maxLength && <div className='field-counter'>{`${inputLength} / ${maxLength}`}</div>}
    </>
  );
};

/**
 * Generic field description
 *
 * Does nothing in inline mode.
 * Displays an error message if there is an error message and if not in read only.
 * Displays a helper message if defined.
 * Displays a counter if the input length and max length are defined.
 *
 */
const GenericFieldDescription = (props: IGenericFieldDescriptionProps): ReactElement => {
  const { errorMessage, helperText, inline, maxLength } = props;

  if (inline || (!helperText && !maxLength && !errorMessage)) return <></>;

  return <div className='field-message'>{message(props)}</div>;
};

GenericFieldDescription.defaultProps = {
  errorMessage: undefined,
  helperText: undefined,
  inline: false,
  inputLength: 0,
  maxLength: undefined,
  readOnly: false,
};

export default GenericFieldDescription;
