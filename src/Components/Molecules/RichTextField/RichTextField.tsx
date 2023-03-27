import React, { ReactElement, Ref } from 'react';

import { GenericField } from '../../Atoms/GenericField';
import { RichTextInput } from '../../Atoms/RichTextInput';
import { IRichTextInputProps } from '../../Atoms/RichTextInput/RichTextInput';

export interface IRichTextFieldProps extends Omit<IRichTextInputProps, 'className' | 'isInError'> {
  /** React Container ref (optional, default: undefined) */
  containerRef?: Ref<HTMLDivElement>;
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
  /** Label (optional, default: undefined) */
  label?: string;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  labelSize?: number;
  /** Mandatory field (optional, default: false) */
  mandatory?: boolean;
}

/**
 * Rich Text field component
 *
 * Rich Text input wrapped in a generic field ( @see GenericField ).
 *
 * Calls @param onChange for every blur.
 *
 */
export const RichTextField = (props: IRichTextFieldProps): ReactElement => {
  const {
    containerRef,
    dataTestId,
    disabled,
    enableImage,
    enableLink,
    errorMessage,
    fieldClassName,
    fieldSize,
    helperText,
    highlighted,
    inline,
    inputClassName,
    input,
    label,
    labelSize,
    locale,
    mandatory,
    maxLength,
    name,
    onChange,
    readOnly,
    style,
  } = props;

  return (
    <GenericField
      containerRef={containerRef}
      errorMessage={errorMessage}
      fieldClassName={fieldClassName}
      fieldSize={fieldSize}
      helperText={helperText}
      highlighted={highlighted}
      inline={inline}
      label={label}
      labelSize={labelSize}
      mandatory={mandatory}
      readOnly={readOnly}>
      <RichTextInput
        className={inputClassName}
        dataTestId={dataTestId}
        disabled={disabled}
        enableImage={enableImage}
        enableLink={enableLink}
        input={input}
        isInError={errorMessage !== undefined}
        locale={locale}
        maxLength={maxLength}
        name={name}
        onChange={onChange}
        readOnly={readOnly}
        style={style}
      />
    </GenericField>
  );
};

RichTextField.defaultProps = {
  containerRef: undefined,
  convertImagesToBase64: true,
  dataTestId: undefined,
  disabled: false,
  enableImage: false,
  enableLink: false,
  errorMessage: undefined,
  fieldClassName: undefined,
  fieldSize: undefined,
  helperText: undefined,
  highlighted: false,
  inline: false,
  inputClassName: undefined,
  input: undefined,
  label: undefined,
  labelSize: undefined,
  locale: undefined,
  mandatory: undefined,
  maxLength: undefined,
  name: undefined,
  readOnly: false,
  style: undefined,
};

export default RichTextField;
