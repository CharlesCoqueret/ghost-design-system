import React, { ReactElement } from 'react';
import { default as ReactSelect } from 'react-select';
import classnames from 'classnames';

import { IOption } from './types';
import { customStyles } from './selectStyles';

export interface ISelectInputProps {
  /** Class for the input (optional, default: undefined) */
  className?: string;
  /** Custom colors settings */
  colors?: {
    controlErrorColor: string; // colors.error,
    controlFocusColor: string; // colors.primary,
    fontColor: string; // 'rgb(0, 0, 0)',
    optionFocusColor: string; // colors.chalk,
    optionSelectedColor: string; // colors.primary,
  };
  /** For test purpose only */
  dataTestId?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  fieldSize?: number;
  /** Highlight value in readonly mode (optional, default: false) */
  highlighted?: boolean;
  /** Input string value (optional, default: undefined) */
  inputValue?: string | number | null | undefined;
  /** Provide the ability to clear the value (optional, default: false) */
  isClearable?: boolean;
  /** Is in Error (optional, default: false) */
  isInError?: boolean;
  /** Maximum height of the menu in px (optional, default: 300) */
  maxMenuHeight?: number;
  /** Name of select input */
  name: string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (selectedOption: string | number | null | undefined) => void;
  /** Options to be displayed */
  options: Array<IOption>;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
  /** Use portal, it is remmended to set it to false for modal (optional, default true) */
  usePortal?: boolean;
}

const SelectInput = (props: ISelectInputProps): ReactElement => {
  const {
    className,
    colors,
    dataTestId,
    disabled,
    fieldSize,
    highlighted,
    inputValue,
    isClearable,
    isInError,
    maxMenuHeight,
    name,
    onChange,
    options,
    placeholder,
    readOnly,
    usePortal,
  } = props;

  if (readOnly) {
    const displayValue = (inputValue && options.find((option) => option.value === inputValue)?.label) || '-';
    return (
      <div
        className={classnames(
          'gds-select-container',
          'input-select-field-read-only',
          fieldSize && `field-input-size-${fieldSize}`,
          {
            'field-highlighted': highlighted,
          },
          className,
        )}
        data-testid={dataTestId}>
        {displayValue}
      </div>
    );
  }

  return (
    <div
      className={classnames(
        'gds-select-container',
        'input-select-field',
        fieldSize && `field-input-size-${fieldSize}`,
        {
          'input-error': isInError && !disabled,
        },
        className,
      )}>
      <ReactSelect<IOption, false>
        data-testid={dataTestId}
        hideSelectedOptions={false}
        isClearable={isClearable}
        isDisabled={disabled}
        isSearchable
        maxMenuHeight={maxMenuHeight}
        menuPlacement='auto'
        name={name}
        onChange={(option) => {
          if (onChange) {
            onChange(option?.value);
          }
        }}
        options={options}
        placeholder={placeholder}
        menuPortalTarget={usePortal ? document.querySelector('body') : undefined}
        styles={customStyles({ ...colors, isInError })}
        value={options.find((option) => option.value === inputValue) || null}
      />
    </div>
  );
};

SelectInput.defaultProps = {
  className: undefined,
  colors: {
    controlErrorColor: 'rgb(255, 52, 24)',
    controlFocusColor: 'rgb(38, 186, 212)',
    fontColor: 'rgb(0, 0, 0)',
    optionFocusColor: 'rgb(228, 228, 228)',
    optionSelectedColor: 'rgb(38, 186, 212)',
  },
  disabled: false,
  fieldSize: undefined,
  highlighted: false,
  inputValue: undefined,
  isClearable: false,
  isInError: false,
  maxMenuHeight: 300,
  onChange: undefined,
  placeholder: undefined,
  readOnly: false,
  usePortal: true,
};

export default SelectInput;
