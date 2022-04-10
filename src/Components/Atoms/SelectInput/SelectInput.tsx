import React, { ReactElement } from 'react';
import { ClearIndicatorProps, default as ReactSelect, DropdownIndicatorProps } from 'react-select';
import classnames from 'classnames';

import { IOption } from './types';
import { customStyles } from './selectStyles';
import { Icon } from '../Icon';
import { Typography } from '../Typography';

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
  /** Ellipsis in readonly (optional, default: false) */
  ellipsis?: boolean;
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
    ellipsis,
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
          'field',
          'gds-select-container',
          'input-select-field-read-only',
          {
            'field-highlighted': highlighted,
          },
          className,
        )}
        data-testid={dataTestId}>
        <Typography.Text ellipsis={ellipsis}>{displayValue}</Typography.Text>
      </div>
    );
  }

  return (
    <div
      className={classnames(
        'field',
        'gds-select-container',
        'input-select-field',
        {
          'input-error': isInError && !disabled,
        },
        className,
      )}>
      <ReactSelect<IOption, false>
        components={{
          DropdownIndicator: (props: DropdownIndicatorProps<IOption, false>) => {
            const { innerProps } = props;
            return (
              <div {...innerProps}>
                <Icon
                  icon={['fal', 'chevron-down']}
                  className='dynamic-search-icon'
                  data-testid={dataTestId ? `${dataTestId}-magnifier` : undefined}
                />
              </div>
            );
          },
          ClearIndicator: (props: ClearIndicatorProps<IOption, false>) => {
            const { innerProps } = props;
            return (
              <div {...innerProps}>
                <Icon
                  icon={['fal', 'xmark']}
                  className='dynamic-search-icon'
                  data-testid={dataTestId ? `${dataTestId}-clear` : undefined}
                />
              </div>
            );
          },
        }}
        data-testid={dataTestId}
        hideSelectedOptions={false}
        isClearable={isClearable}
        isDisabled={disabled}
        isSearchable
        maxMenuHeight={maxMenuHeight}
        menuPlacement='auto'
        menuShouldBlockScroll={true}
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
  ellipsis: false,
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
