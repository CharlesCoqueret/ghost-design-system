import React, { ReactElement, useCallback } from 'react';
import { default as ReactSelect, components, ValueContainerProps } from 'react-select';
import classnames from 'classnames';

import { customStyles } from './selectStyles';
import { IOption } from './types';

export interface IMultiSelectInputProps {
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
  inputValue?: Array<string | number>;
  /** Provide the ability to clear the value (optional, default: false) */
  isClearable?: boolean;
  /** Is in Error (optional, default: false) */
  isInError?: boolean;
  /** Maximum height of the menu in px (optional, default: 300) */
  maxMenuHeight?: number;
  /** Name of select input */
  name: string;
  /** Label to be used when one item is selected (example: "{} item selected")
   * Note: the {} will be replaced by the actual number */
  numberOfItemLabel: string;
  /** Label to be used when more than one item is selected (example: "{} items selected")
   * Note: the {} will be replaced by the actual number */
  numberOfItemsLabel: string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (selectedOptions: Array<string | number> | undefined) => void;
  /** Options to be displayed */
  options: Array<IOption>;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
  /** Use portal, it is remmended to set it to false for modal (optional, default true) */
  usePortal?: boolean;
}

const CustomValueContainer = ({
  numberOfItemsLabel,
  numberOfItemLabel,
  ...props
}: ValueContainerProps<IOption, true> & { numberOfItemsLabel: string; numberOfItemLabel: string }) => {
  const { getValue, hasValue, children } = props;

  const nbValues = getValue().length;
  const selectedResult =
    getValue().length === 1
      ? numberOfItemLabel.replaceAll('{}', '1')
      : numberOfItemsLabel.replaceAll('{}', nbValues.toString());

  return (
    <components.ValueContainer {...props}>
      {hasValue && selectedResult}
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement(child) &&
          'type' in child &&
          typeof child.type !== 'string' &&
          typeof child.type !== 'number' &&
          ['Input', 'DummyInput', 'Placeholder', 'w'].indexOf(child.type.name) >= 0
        ) {
          return child;
        }

        return <></>;
      })}
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
    numberOfItemLabel,
    numberOfItemsLabel,
    onChange,
    options,
    placeholder,
    readOnly,
    usePortal,
  } = props;

  const localValueContainer = useCallback(
    (inputProps: ValueContainerProps<IOption, true>) => (
      <CustomValueContainer
        {...inputProps}
        numberOfItemLabel={numberOfItemLabel}
        numberOfItemsLabel={numberOfItemsLabel}
      />
    ),
    [],
  );

  if (readOnly || disabled) {
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
          ValueContainer: localValueContainer,
        }}
        data-testid={dataTestId}
        hideSelectedOptions={false}
        isClearable={isClearable}
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
        styles={customStyles({ ...colors, isInError })}
        value={options.filter((option) => inputValue && inputValue.indexOf(option.value) >= 0)}
      />
    </div>
  );
};

MultiSelectInput.defaultProps = {
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
  numberOfItemLabel: '{} item selected',
  numberOfItemsLabel: '{} items selected',
  onChange: undefined,
  placeholder: undefined,
  readOnly: false,
  usePortal: true,
};

export default MultiSelectInput;
