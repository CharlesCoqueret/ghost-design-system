import React, { ReactElement, Ref, useState } from 'react';

import { GenericField } from '../../Atoms/GenericField';
import TextAreaInput, { ITextAreaInputProps } from '../../Atoms/TextAreaInput/TextAreaInput';

export interface ITextAreaFieldProps extends Omit<ITextAreaInputProps, 'className' | 'isInError' | 'onChange'> {
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
  /** Class for the input (optional, default: undefined) */
  inputClassName?: string;
  /** Label (optional, default: undefined) */
  label?: string;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  labelSize?: number;
  /** Mandatory field (optional, default: false) */
  mandatory?: boolean;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (newValue: string) => void;
}

/**
 * Text area field component
 *
 * Text area field wrapped in a generic field ( @see GenericField ).
 *
 * Calls @param onChange for every input change.
 *
 */
export const TextAreaField = (props: ITextAreaFieldProps): ReactElement => {
  const {
    containerRef,
    dataTestId,
    disabled,
    errorMessage,
    fieldClassName,
    fieldSize,
    helperText,
    highlighted,
    inputClassName,
    input,
    label,
    labelSize,
    mandatory,
    maxLength,
    minLength,
    name,
    onChange,
    placeholder,
    readOnly,
  } = props;

  const [inputLength, setInputLength] = useState<number>(input ? input.toString().length : 0);

  /**
   * Handler of changes
   *
   * @param event input event
   */
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputLength(event.target.value.length);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <GenericField
      containerRef={containerRef}
      errorMessage={errorMessage}
      fieldClassName={fieldClassName}
      fieldSize={fieldSize}
      helperText={helperText}
      highlighted={highlighted}
      label={label}
      labelSize={labelSize}
      mandatory={mandatory}
      readOnly={readOnly}
      maxLength={maxLength}
      inputLength={inputLength}>
      <TextAreaInput
        dataTestId={dataTestId}
        disabled={disabled}
        highlighted={highlighted}
        className={inputClassName}
        input={input}
        isInError={errorMessage !== undefined}
        maxLength={maxLength}
        minLength={minLength}
        name={name}
        onChange={onChangeHandler}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </GenericField>
  );
};

TextAreaField.defaultProps = {
  disabled: false,
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
  mandatory: false,
  maxLength: undefined,
  minLength: undefined,
  name: undefined,
  onChange: undefined,
  placeholder: undefined,
  readOnly: false,
};

export default TextAreaField;
