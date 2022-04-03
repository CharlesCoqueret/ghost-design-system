import React, { PropsWithChildren, ReactElement, Ref } from 'react';
import classnames from 'classnames';

import GenericFieldLabel from './GenericFieldLabel';
import GenericFieldDescription from './GenericFieldDescrption';

interface IGenericFieldProps {
  containerRef?: Ref<HTMLDivElement>;
  /** Disabled field (optional, default: undefined) */
  disabled?: boolean;
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
  /** Invert input and description order, speicfic for switches and checkbox (optional, default: false) */
  invertInputDescription?: boolean;
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
    containerRef,
    disabled,
    errorMessage,
    fieldClassName,
    helperText,
    highlighted,
    inline,
    inputLength,
    invertInputDescription,
    label,
    labelSize,
    mandatory,
    maxLength,
    readOnly,
  } = props;

  return (
    <div className={classnames('gds-field-group', fieldClassName, { 'field-inline': inline })} ref={containerRef}>
      <GenericFieldLabel
        className={classnames({ 'field-highlighted': highlighted && (readOnly || disabled) })}
        label={label}
        mandatory={mandatory}
        readOnly={readOnly}
        size={labelSize}
      />
      {!invertInputDescription && children}
      <GenericFieldDescription
        errorMessage={errorMessage}
        helperText={helperText}
        inline={inline}
        inputLength={inputLength}
        maxLength={maxLength}
        readOnly={readOnly}
        invertInputDescription={invertInputDescription}
      />
      {invertInputDescription && children}
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
  invertInputDescription: false,
  label: undefined,
  labelSize: undefined,
  mandatory: false,
  maxLength: undefined,
  readOnly: false,
};

export default GenericField;
