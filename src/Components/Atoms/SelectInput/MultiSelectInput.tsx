import React, { ReactElement } from 'react';
import {
  default as ReactSelect,
  components,
  MultiValue,
  MultiValueGenericProps,
  ValueContainerProps,
} from 'react-select';
import classnames from 'classnames';

import OverflowWrapper from './OverflowWrapper';
import { customStyles } from './selectStyles';
import { IOption } from './types';

export interface IMultiSelectInputProps {
  /** Class for the input (optional, default: undefined) */
  className?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  fieldSize?: number;
  /** Highlight value in readonly mode (optional, default: false) */
  highlighted?: boolean;
  /** Input string value (optional, default: undefined) */
  inputValue?: MultiValue<IOption>;
  /** Provide the ability to clear the value (optional, default: false) */
  isClearable?: boolean;
  /** Is in Error (optional, default: false) */
  isInError?: boolean;
  /** Maximum height of the menu in px (optional, default: 300) */
  maxMenuHeight?: number;
  /** Name of select input */
  name: string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (selectedOptions: MultiValue<IOption> | undefined) => void;
  /** Options to be displayed */
  options: Array<IOption>;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
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
  } = props;

  if (readOnly)
    return (
      <div
        className={classnames(
          'field',
          'select-container',
          'input-select-field-read-only',
          fieldSize && `field-input-size-${fieldSize}`,
          {
            'field-highlighted': highlighted,
          },
          className,
        )}>
        {inputValue && inputValue.length > 0 ? inputValue.map((option) => option.label).join(', ') : '-'}
      </div>
    );

  return (
    <div
      className={classnames(
        'field',
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
        hideSelectedOptions={false}
        isClearable={isClearable}
        isDisabled={disabled}
        isMulti
        isSearchable
        name={name}
        maxMenuHeight={maxMenuHeight}
        menuPlacement='auto'
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        styles={customStyles({ isInError })}
        value={inputValue}
      />
    </div>
  );
};

MultiSelectInput.defaultProps = {
  className: undefined,
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
};

export default MultiSelectInput;
