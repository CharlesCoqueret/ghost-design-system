import React, { PropsWithChildren, ReactElement } from 'react';
import classNames from 'classnames';

import GenericFieldLabel from './GenericFieldLabel';

interface IGenericFieldProps {
  /** Error message (optional, default: undefined) */
  errorMessage?: string;
  /** Class for the field surrounding the input (optional, default: undefined) */
  fieldClassName?: string;
  /** Helper text (optional, default: undefined) */
  helperText?: string;
  /** Highlighted field (optional, default: false) */
  highlighted?: boolean;
  /** Inline field (optional, default: false) */
  inline?: boolean;
  /** Input string value (optional, default: 0) */
  inputLength?: number;
  /** Label (optional, default: undefined) */
  label?: string;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  labelSize?: number;
  /** Mandatory field (optional, default: false) */
  mandatory?: boolean;
  /** Maximum length of the textfield (optional, default: undefined) */
  maxLength?: number;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
}

/**
 * Generic field component
 *
 * Manages the display of label, error message, helper text, counter.
 *
 * When inline, no error message, helper text nor counter.
 *
 * When in read only, no error message nor counter, only helper text.
 *
 */
const GenericField = (props: PropsWithChildren<IGenericFieldProps>): ReactElement => {
  const {
    children,
    errorMessage,
    fieldClassName,
    helperText,
    highlighted,
    inline,
    inputLength,
    label,
    labelSize,
    mandatory,
    maxLength,
    readOnly,
  } = props;

  const message = (
    helperText?: string,
    maxLength?: number,
    errorMessage?: string,
    readOnly?: boolean,
  ): ReactElement => {
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

  return (
    <div
      className={classNames(
        'field-group',
        fieldClassName,
        { 'field-highlighted': highlighted && readOnly },
        { 'field-inline': inline },
      )}>
      <GenericFieldLabel label={label} mandatory={mandatory} readOnly={readOnly} size={labelSize} />
      {children}
      {!inline && (helperText || maxLength || errorMessage) && (
        <div className='field-message'>{message(helperText, maxLength, errorMessage, readOnly)}</div>
      )}
    </div>
  );
};

GenericField.defaultProps = {
  errorMessage: undefined,
  fieldClassName: undefined,
  helperText: undefined,
  highlighted: false,
  inline: false,
  inputLength: 0,
  label: undefined,
  labelSize: undefined,
  mandatory: false,
  maxLength: undefined,
  readOnly: false,
};

export default GenericField;
