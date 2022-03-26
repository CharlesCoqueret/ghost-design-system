import React, { ReactElement, Ref } from 'react';
import classnames from 'classnames';

import { GenericField, IOption, MultiSelectInput } from '../../Atoms';
import colors from '../../Atoms/Colors/colors';

export interface IMultiSelectFieldProps {
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
  /** Helper text (optional, default: undefined) */
  helperText?: string;
  /** Highlighted field (optional, default: false) */
  highlighted?: boolean;
  /** Inline field (optional, default: false) */
  inline?: boolean;
  /** Class for the input (optional, default: undefined) */
  inputClassName?: string;
  /** Input string value (optional, default: undefined) */
  inputValue: Array<string> | undefined;
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
  /** Label to be used when one item is selected (example: "{} item selected")
   * Note: the {} will be replaced by the actual number */
  numberOfItemLabel: string;
  /** Label to be used when more than one item is selected (example: "{} items selected")
   * Note: the {} will be replaced by the actual number */
  numberOfItemsLabel: string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (newValue: Array<string> | null | undefined) => void;
  /** Options available to be picked from */
  options: Array<IOption>;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
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
export const MultiSelectField = (props: IMultiSelectFieldProps): ReactElement => {
  const {
    colors,
    containerRef,
    dataTestId,
    disabled,
    errorMessage,
    fieldClassName,
    fieldSize,
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
      helperText={helperText}
      highlighted={highlighted}
      inline={inline}
      label={label}
      labelSize={labelSize}
      mandatory={mandatory}
      readOnly={readOnly}>
      <MultiSelectInput
        className={classnames(
          inputClassName,
          'field',
          'input-select-field',
          fieldSize && `field-input-size-${fieldSize}`,
        )}
        colors={colors}
        dataTestId={dataTestId}
        disabled={disabled}
        highlighted={highlighted}
        inputValue={inputValue}
        isClearable={isClearable}
        isInError={errorMessage !== undefined}
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
  colors: {
    controlErrorColor: colors.error.rgb,
    controlFocusColor: colors.primary.rgb,
    fontColor: 'rgb(0, 0, 0)',
    optionFocusColor: colors.chalk.rgb,
    optionSelectedColor: colors.primary.rgb,
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

export default MultiSelectField;
