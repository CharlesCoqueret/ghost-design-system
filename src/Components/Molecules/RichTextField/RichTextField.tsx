import React, { CSSProperties, ReactElement, Ref } from 'react';

import { GenericField } from '../../Atoms/GenericField';
import { RichTextInput, lang } from '../../Atoms/RichTextInput';

export interface IRichTextFieldProps {
  /** React Container ref (optional, default: undefined) */
  containerRef?: Ref<HTMLDivElement>;
  /** Convert onBlur all images to base64 (optional, default: true) */
  convertImagesToBase64?: boolean;
  /** For test purpose only */
  dataTestId?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Enable image (optional, default: false) */
  enableImage?: boolean;
  /** Enable link  (optional, default: false) */
  enableLink?: boolean;
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
  /** Input value (optional, default: undefined) */
  inputValue?: string;
  /** Label (optional, default: undefined) */
  label?: string;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  labelSize?: number;
  /** Locale for tooltips (optional, default: undefined, meaning english) */
  locale?: lang;
  /** Mandatory field (optional, default: false) */
  mandatory?: boolean;
  /** Maximum number of character of the field (optionsl, default: undefined) */
  maxLength?: number;
  /** Name of text field (optional, default: undefined) */
  name?: string;
  /** handler of changes notifying only on blur of the input for performance reason */
  onChange?: (newValue: string) => void;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
  /** Custom style (optional, default: undefined) */
  style?: CSSProperties;
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
    inputValue,
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
        inputValue={inputValue}
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
  inputValue: undefined,
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
