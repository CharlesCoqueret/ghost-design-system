import React, { ReactElement, Ref, useState } from 'react';

import { GenericField } from '../../Atoms/GenericField';
import TextInput, { ITextInputProps } from '../../Atoms/TextInput/TextInput';

export interface ITextFieldProps extends Omit<ITextInputProps, 'className' | 'isInError' | 'onChange'> {
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
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (newValue: string) => void;
}

/**
 * Text field component
 *
 * Text field wrapped in a generic field ( @see GenericField ).
 *
 * Calls @param onChange for every input change.
 *
 * When the @param maxLength , the letter counter is displayed.
 */
export const TextField = (props: ITextFieldProps): ReactElement => {
  const {
    containerRef,
    dataTestId,
    disabled,
    ellipsis,
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
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
      inline={inline}
      label={label}
      labelSize={labelSize}
      mandatory={mandatory}
      readOnly={readOnly}
      maxLength={maxLength}
      inputLength={inputLength}>
      <TextInput
        className={inputClassName}
        dataTestId={dataTestId}
        disabled={disabled}
        ellipsis={ellipsis}
        highlighted={highlighted}
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

TextField.defaultProps = {
  disabled: false,
  ellipsis: false,
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

export default TextField;
