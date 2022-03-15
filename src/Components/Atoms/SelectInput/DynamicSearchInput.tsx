import React, { ReactElement, useEffect, useState } from 'react';
import { default as ReactSelectAsync } from 'react-select/async';
import classnames from 'classnames';

import { customStyles } from './selectStyles';
import { IOption } from './types';
import colors from '../Colors/colors';
import { Icon } from '../Icon';

export interface IDynamicSearchInputProps {
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
  inputValue?: string;
  /** Provide the ability to clear the value (optional, default: false) */
  isClearable?: boolean;
  /** Is in Error (optional, default: false) */
  isInError?: boolean;
  /** Maximum height of the menu in px (optional, default: 300) */
  maxMenuHeight?: number;
  /** Name of select input */
  name: string;
  /** No option message (dispayed when no results are available) */
  noOptionsMessage: (obj: { inputValue: string }) => string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (selectedOption: string | undefined) => void;
  /** Placeholder value (optional, default: undefined) */
  placeholder?: string;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
  /** Resolved the value from the provided input (value of the {value, label} object) */
  resolveValue: (value: string) => Promise<IOption | undefined>;
  /** Search for different options based on the term provided by the user */
  searchOptions: (searchTerm: string) => Promise<Array<IOption> | undefined>;
}

const DynamicSearchInput = (props: IDynamicSearchInputProps): ReactElement => {
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
    noOptionsMessage,
    onChange,
    placeholder,
    readOnly,
    resolveValue,
    searchOptions,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [currentOption, setCurrentOption] = useState<IOption>();

  const resolveIncomingValue = () => {
    if (inputValue && inputValue !== currentOption?.value) {
      setIsLoading(true);
      resolveValue(inputValue)
        .then((result) => {
          setCurrentOption(result);
        })
        .catch(() => {
          setCurrentOption(undefined);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setCurrentOption(undefined);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setCurrentOption(undefined);
    resolveIncomingValue();
  }, [inputValue]);

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
        {isLoading ? <Icon icon={['fal', 'spinner']} spin /> : currentOption ? currentOption.label : '-'}
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
      <ReactSelectAsync<IOption, false>
        closeMenuOnSelect={false}
        components={{
          LoadingIndicator: () => <Icon icon={['fal', 'spinner']} spin className='dynamic-search-spinner' />,
        }}
        data-testid={dataTestId}
        hideSelectedOptions={false}
        isClearable={isClearable}
        isDisabled={disabled}
        isLoading={isLoading}
        isSearchable
        loadOptions={searchOptions}
        name={name}
        maxMenuHeight={maxMenuHeight}
        menuPlacement='auto'
        menuPortalTarget={document.querySelector('body')}
        noOptionsMessage={noOptionsMessage}
        onChange={(option) => {
          if (onChange) {
            onChange(option?.value);
          }
          setCurrentOption(option || undefined);
          setIsLoading(false);
        }}
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
        value={currentOption}
      />
    </div>
  );
};

DynamicSearchInput.defaultProps = {
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
  options: undefined,
  placeholder: undefined,
  readOnly: false,
};

export default DynamicSearchInput;
