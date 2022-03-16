import React, { ReactElement } from 'react';
import { default as ReactSelect, components, MultiValueGenericProps, ValueContainerProps } from 'react-select';
import classnames from 'classnames';

import OverflowWrapper from './OverflowWrapper';
import { customStyles } from './selectStyles';
import { IOption } from './types';
import colors from '../Colors/colors';

export interface IMultiSelectInputProps {
  /** Class for the input (optional, default: undefined) */
  className?: string;
  /** Custom colors settings */
  colors?: {
    controlErrorColor: string; // colors.error,
    controlFocusColor: string; // colors.primary,
    controlBackgroundColorDisabled: string; // colors.chalk,
    controlColorDisabled: string; // colors.pebble,
    fontColor: string; // 'rgb(0, 0, 0)',
    multiValueBorderColorDisabled: string; // colors.silver,
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
  inputValue?: Array<string>;
  /** Provide the ability to clear the value (optional, default: false) */
  isClearable?: boolean;
  /** Is in Error (optional, default: false) */
  isInError?: boolean;
  /** Maximum height of the menu in px (optional, default: 300) */
  maxMenuHeight?: number;
  /** Name of select input */
  name: string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (selectedOptions: Array<string> | undefined) => void;
  /** Options to be displayed */
  options: Array<IOption>;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
  /** Use portal, it is remmended to set it to false for modal (optional, default true) */
  usePortal?: boolean;
}

const CustomMultiValueContainer = (props: MultiValueGenericProps<IOption>) => {
  return (
    <div data-targetid={props.data.value}>
      <components.MultiValueContainer {...props} />
    </div>
  );
};

const CustomValueContainer = (props: ValueContainerProps<IOption, true>) => {
  const { children } = props;

  return (
    <components.ValueContainer {...props}>
      <OverflowWrapper>{children}</OverflowWrapper>
    </components.ValueContainer>
  );
};

const MultiSelectInput = (props: IMultiSelectInputProps): ReactElement => {
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
    return (
      <div
        className={classnames(
          'select-container',
          'input-select-field-read-only',
          fieldSize && `field-input-size-${fieldSize}`,
          {
            'field-highlighted': highlighted,
          },
          className,
        )}
        data-testid={dataTestId}>
        {options
          .filter((option) => inputValue?.includes(option.value))
          .map((option) => option.label)
          .join(', ') || '-'}
      </div>
    );
  }

  return (
    <div
      className={classnames(
        'select-container',
        'input-select-field',
        fieldSize && `field-input-size-${fieldSize}`,
        {
          'input-error': isInError && !disabled,
        },
        className,
      )}>
      <ReactSelect<IOption, true>
        closeMenuOnSelect={false}
        components={{
          ValueContainer: CustomValueContainer,
          MultiValueContainer: CustomMultiValueContainer,
        }}
        data-testid={dataTestId}
        hideSelectedOptions={false}
        isClearable={isClearable}
        isDisabled={disabled}
        isMulti
        isSearchable
        name={name}
        maxMenuHeight={maxMenuHeight}
        menuPlacement='auto'
        menuPortalTarget={usePortal ? document.querySelector('body') : undefined}
        onChange={(options) => {
          if (onChange) {
            onChange(options.map((option) => option.value));
          }
        }}
        options={options}
        placeholder={placeholder}
        styles={customStyles({
          controlBackgroundColorDisabled: colors?.controlBackgroundColorDisabled,
          controlColorDisabled: colors?.controlColorDisabled,
          controlErrorColor: colors?.controlErrorColor,
          controlFocusColor: colors?.controlFocusColor,
          fontColor: colors?.fontColor,
          isInError,
          optionFocusColor: colors?.optionFocusColor,
          optionSelectedColor: colors?.optionSelectedColor,
        })}
        value={options.filter((option) => inputValue?.includes(option.value)) || null}
      />
    </div>
  );
};

MultiSelectInput.defaultProps = {
  className: undefined,
  colors: {
    controlErrorColor: colors.error.rgb,
    controlFocusColor: colors.primary.rgb,
    controlBackgroundColorDisabled: colors.chalk.rgb,
    controlColorDisabled: colors.pebble.rgb,
    fontColor: 'rgb(0, 0, 0)',
    optionFocusColor: colors.chalk.rgb,
    optionSelectedColor: colors.primary.rgb,
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

export default MultiSelectInput;
