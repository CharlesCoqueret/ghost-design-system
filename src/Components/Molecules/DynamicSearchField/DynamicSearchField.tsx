import React, { ReactElement, Ref } from 'react';

import { GenericField } from '../../Atoms/GenericField';
import DynamicSearchInput, { IDynamicSearchInputProps } from '../../Atoms/SelectInput/DynamicSearchInput';

export interface IDynamicSearchFieldProps extends Omit<IDynamicSearchInputProps, 'className' | 'isInError'> {
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
export const DynamicSearchField = (props: IDynamicSearchFieldProps): ReactElement => {
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
    noOptionsMessage,
    onChange,
    placeholder,
    readOnly,
    resolveValue,
    searchOptions,
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
      <DynamicSearchInput
        className={inputClassName}
        dataTestId={dataTestId}
        ellipsis={ellipsis}
        highlighted={highlighted}
        isInError={errorMessage !== undefined}
        isClearable={isClearable}
        maxMenuHeight={maxMenuHeight}
        name={name}
        noOptionsMessage={noOptionsMessage}
        placeholder={placeholder}
        disabled={disabled}
        input={input}
        onChange={onChange}
        readOnly={readOnly}
        resolveValue={resolveValue}
        searchOptions={searchOptions}
        usePortal={usePortal}
      />
    </GenericField>
  );
};

DynamicSearchField.defaultProps = {
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

export default DynamicSearchField;
