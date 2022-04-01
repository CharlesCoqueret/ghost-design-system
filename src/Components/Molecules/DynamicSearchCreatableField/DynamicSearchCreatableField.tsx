import React, { ReactElement, Ref } from 'react';
import classnames from 'classnames';

import { GenericField, IOption, DynamicSearchCreatableInput } from '../../Atoms';

export interface IDynamicSearchCreatableFieldProps {
  /** Custom colors settings */
  colors?: {
    controlErrorColor: string; // colors.error,
    controlFocusColor: string; // colors.primary,
    fontColor: string; // 'rgb(0, 0, 0)',
    optionFocusColor: string; // colors.chalk,
    optionSelectedColor: string; // colors.primary,
  };
  /** React Container ref (optional, default: undefined) */
  containerRef?: Ref<HTMLDivElement>;
  /** For test purpose only */
  dataTestId?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Error message (optional, default: undefined) */
  errorMessage?: string;
  /** Class for the field surrounding the input (optional, default: undefined) */
  fieldClassName?: string;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  fieldSize?: number;
  /** New entry creation entry */
  handleCreate: (newLabel: string) => Promise<IOption | undefined>;
  /** Helper text (optional, default: undefined) */
  helperText?: string;
  /** Highlighted field (optional, default: false) */
  highlighted?: boolean;
  /** Inline field (optional, default: false) */
  inline?: boolean;
  /** Class for the input (optional, default: undefined) */
  inputClassName?: string;
  /** Input string value (optional, default: undefined) */
  inputValue: string | number | undefined;
  /** Provide the ability to clear the value (optional, default: false) */
  isClearable?: boolean;
  /** Label (optional, default: undefined) */
  label?: string;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  labelSize?: number;
  /** Mandatory field (optional, default: false) */
  mandatory?: boolean;
  /** Name of text field */
  name: string;
  /** No option message (dispayed when no results are available) */
  noOptionsMessage: (obj: { inputValue: string }) => string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (newValue: string | number | null | undefined) => void;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
  /** Resolved the value from the provided input (value of the {value, label} object) */
  resolveValue: (value: string | number) => Promise<IOption | undefined>;
  /** Search for different options based on the term provided by the user */
  searchOptions: (searchTerm: string) => Promise<Array<IOption> | undefined>;
  /** Use portal, it is remmended to set it to false for modal (optional, default true) */
  usePortal?: boolean;
}

/**
 * Select field component
 *
 * Select field wrapped in a generic field ( @see GenericField ).
 *
 * Calls @param onChange for every input change.
 *
 */
export const DynamicSearchCreatableField = (props: IDynamicSearchCreatableFieldProps): ReactElement => {
  const {
    colors,
    containerRef,
    dataTestId,
    disabled,
    errorMessage,
    fieldClassName,
    fieldSize,
    handleCreate,
    helperText,
    highlighted,
    inline,
    inputClassName,
    inputValue,
    isClearable,
    label,
    labelSize,
    mandatory,
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
      helperText={helperText}
      highlighted={highlighted}
      inline={inline}
      label={label}
      labelSize={labelSize}
      mandatory={mandatory}
      readOnly={readOnly}>
      <DynamicSearchCreatableInput
        colors={colors}
        className={classnames(
          inputClassName,
          'field',
          'input-select-field',
          fieldSize && `field-input-size-${fieldSize}`,
        )}
        dataTestId={dataTestId}
        handleCreate={handleCreate}
        highlighted={highlighted}
        isInError={errorMessage !== undefined}
        isClearable={isClearable}
        name={name}
        noOptionsMessage={noOptionsMessage}
        placeholder={placeholder}
        disabled={disabled}
        inputValue={inputValue}
        onChange={onChange}
        readOnly={readOnly}
        resolveValue={resolveValue}
        searchOptions={searchOptions}
        usePortal={usePortal}
      />
    </GenericField>
  );
};

DynamicSearchCreatableField.defaultProps = {
  colors: {
    controlErrorColor: 'rgb(255, 52, 24)',
    controlFocusColor: 'rgb(38, 186, 212)',
    fontColor: 'rgb(0, 0, 0)',
    optionFocusColor: 'rgb(228, 228, 228)',
    optionSelectedColor: 'rgb(38, 186, 212)',
  },
  disabled: false,
  errorMessage: undefined,
  fieldClassName: undefined,
  fieldSize: undefined,
  helperText: undefined,
  highlighted: false,
  inline: false,
  inputClassName: undefined,
  inputValue: undefined,
  isClearable: false,
  label: undefined,
  labelSize: undefined,
  mandatory: false,
  onChange: undefined,
  placeholder: undefined,
  readOnly: false,
  usePortal: true,
};

export default DynamicSearchCreatableField;
