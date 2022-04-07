import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { default as ReactSelectAsync } from 'react-select/async';
import { ClearIndicatorProps, DropdownIndicatorProps, LoadingIndicatorProps } from 'react-select';
import classnames from 'classnames';

import { customStyles } from './selectStyles';
import { IOption } from './types';
import { Icon } from '../Icon';
import { Typography } from '../Typography';

export interface IDynamicSearchInputProps {
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
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  fieldSize?: number;
  /** Highlight value in readonly mode (optional, default: false) */
  highlighted?: boolean;
  /** Input string value (optional, default: undefined) */
  inputValue?: string | number;
  /** Provide the ability to clear the value (optional, default: false) */
  isClearable?: boolean;
  /** Is in Error (optional, default: false) */
  isInError?: boolean;
  /** Maximum height of the menu in px (optional, default: 300) */
  maxMenuHeight?: number;
  /** Name of select input */
  name: string;
  /** No option message (dispayed when no results are available) */
  noOptionsMessage: string | ((obj: { inputValue: string }) => string);
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (selectedOption: string | number | undefined) => void;
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

const DynamicSearchInput = (props: IDynamicSearchInputProps): ReactElement => {
  const {
    className,
    colors,
    dataTestId,
    disabled,
    ellipsis,
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
    usePortal,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [currentOption, setCurrentOption] = useState<IOption>();

  const localNoOptionMessage = useCallback(
    (inputObject: { inputValue: string }): string => {
      if (typeof noOptionsMessage === 'string') {
        return noOptionsMessage;
      }
      return noOptionsMessage(inputObject);
    },
    [noOptionsMessage],
  );

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
          'gds-select-container',
          'input-select-field-read-only',
          fieldSize && `field-input-size-${fieldSize}`,
          {
            'field-highlighted': highlighted,
          },
          className,
        )}
        data-testid={dataTestId}>
        {isLoading ? (
          <Icon icon={['fal', 'spinner']} spin data-testid={dataTestId ? `${dataTestId}-spinner` : undefined} />
        ) : currentOption ? (
          <Typography.Text ellipsis={ellipsis}>{currentOption.label}</Typography.Text>
        ) : (
          '-'
        )}
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
      <ReactSelectAsync<IOption, false>
        closeMenuOnSelect={true}
        components={{
          LoadingIndicator: (props: LoadingIndicatorProps<IOption, false>) => {
            const { innerProps } = props;
            return (
              <div {...innerProps}>
                <Icon
                  icon={['fal', 'spinner']}
                  spin
                  className='dynamic-search-icon'
                  data-testid={dataTestId ? `${dataTestId}-spinner` : undefined}
                />
              </div>
            );
          },
          DropdownIndicator: (props: DropdownIndicatorProps<IOption, false>) => {
            const { innerProps } = props;
            return (
              <div {...innerProps}>
                <Icon
                  icon={['fal', 'magnifying-glass']}
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
        inputId={dataTestId}
        isClearable={isClearable}
        isDisabled={disabled}
        isLoading={isLoading}
        isSearchable
        loadOptions={searchOptions}
        name={name}
        maxMenuHeight={maxMenuHeight}
        menuPlacement='auto'
        menuPortalTarget={usePortal ? document.querySelector('body') : undefined}
        menuShouldBlockScroll={true}
        noOptionsMessage={localNoOptionMessage}
        onChange={(option) => {
          if (onChange) {
            onChange(option?.value);
          }
          setCurrentOption(option || undefined);
          setIsLoading(false);
        }}
        placeholder={placeholder}
        styles={customStyles({ ...colors, isInError })}
        value={currentOption}
      />
    </div>
  );
};

DynamicSearchInput.defaultProps = {
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
  usePortal: true,
};

export default DynamicSearchInput;
