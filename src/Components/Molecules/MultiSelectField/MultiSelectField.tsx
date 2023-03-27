import React, { ReactElement, Ref } from 'react';

import { GenericField } from '../../Atoms/GenericField';
import MultiSelectInput, { IMultiSelectInputProps } from '../../Atoms/SelectInput/MultiSelectInput';

export interface IMultiSelectFieldProps extends Omit<IMultiSelectInputProps, 'className' | 'isInError'> {
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
}

/**
 * Select field component
 *
 * Select field wrapped in a generic field ( @see GenericField ).
 *
 * Calls @param onChange for every input change.
 *
 */
export const MultiSelectField = (props: IMultiSelectFieldProps): ReactElement => {
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
    isClearable,
    label,
    labelSize,
    mandatory,
    maxMenuHeight,
    name,
    numberOfItemLabel,
    numberOfItemsLabel,
    onChange,
    options,
    placeholder,
    readOnly,
    usePortal,
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
      <MultiSelectInput
        className={inputClassName}
        dataTestId={dataTestId}
        disabled={disabled}
        ellipsis={ellipsis}
        highlighted={highlighted}
        input={input}
        isClearable={isClearable}
        isInError={errorMessage !== undefined}
        maxMenuHeight={maxMenuHeight}
        name={name}
        numberOfItemLabel={numberOfItemLabel}
        numberOfItemsLabel={numberOfItemsLabel}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        readOnly={readOnly}
        usePortal={usePortal}
      />
    </GenericField>
  );
};

MultiSelectField.defaultProps = {
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
  isClearable: false,
  label: undefined,
  labelSize: undefined,
  mandatory: false,
  name: undefined,
  onChange: undefined,
  placeholder: undefined,
  readOnly: false,
  usePortal: true,
};

export default MultiSelectField;
