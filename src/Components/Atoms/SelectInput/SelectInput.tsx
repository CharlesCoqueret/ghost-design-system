import React, { ReactElement } from 'react';
import { default as ReactSelect } from 'react-select';
import classnames from 'classnames';

import { IOption } from './types';
import { customStyles } from './selectStyles';
import colors from '../Colors/colors';

export interface ISelectInputProps {
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
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  fieldSize?: number;
  /** Highlight value in readonly mode (optional, default: false) */
  highlighted?: boolean;
  /** Input string value (optional, default: undefined) */
  inputValue?: IOption | null | undefined;
  /** Provide the ability to clear the value (optional, default: false) */
  isClearable?: boolean;
  /** Is in Error (optional, default: false) */
  isInError?: boolean;
  /** Maximum height of the menu in px (optional, default: 300) */
  maxMenuHeight?: number;
  /** Name of select input */
  name: string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (selectedOption: IOption | null | undefined) => void;
  /** Options to be displayed */
  options: Array<IOption>;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
}

const SelectInput = (props: ISelectInputProps): ReactElement => {
  const {
    className,
    colors,
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
          'select-container',
          'input-select-field-read-only',
          fieldSize && `field-input-size-${fieldSize}`,
          {
            'field-highlighted': highlighted,
          },
          className,
        )}>
        {inputValue ? inputValue.label : '-'}
      </div>
    );

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
      <ReactSelect<IOption, false>
        hideSelectedOptions={false}
        isClearable={isClearable}
        isDisabled={disabled}
        isSearchable
        maxMenuHeight={maxMenuHeight}
        menuPlacement='auto'
        name={name}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        styles={customStyles({
          controlBackgroundColorDisabled: colors?.controlBackgroundColorDisabled,
          controlColorDisabled: colors?.controlColorDisabled,
          controlErrorColor: colors?.controlErrorColor,
          controlFocusColor: colors?.controlFocusColor,
          fontColor: colors?.fontColor,
          isInError,
          multiValueBorderColorDisabled: colors?.multiValueBorderColorDisabled,
          optionFocusColor: colors?.optionFocusColor,
          optionSelectedColor: colors?.optionSelectedColor,
        })}
        value={inputValue}
      />
    </div>
  );
};

SelectInput.defaultProps = {
  className: undefined,
  colors: {
    controlErrorColor: colors.error.rgb,
    controlFocusColor: colors.primary.rgb,
    controlBackgroundColorDisabled: colors.chalk.rgb,
    controlColorDisabled: colors.pebble.rgb,
    fontColor: 'rgb(0, 0, 0)',
    multiValueBorderColorDisabled: colors.silver.rgb,
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
};

export default SelectInput;
