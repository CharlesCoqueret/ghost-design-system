import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { default as ReactSelectAsyncCreatable } from 'react-select/async-creatable';
import classnames from 'classnames';

import { customStyles } from './selectStyles';
import { IOption } from './types';
import { Icon } from '../Icon';

export interface IDynamicSearchCreatableInputProps {
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
  /** New entry creation entry */
  handleCreate: (newLabel: string) => Promise<IOption | undefined>;
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
  noOptionsMessage: string | ((obj: { inputValue: string }) => string);
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
  /** Use portal, it is remmended to set it to false for modal (optional, default true) */
  usePortal?: boolean;
}

const DynamicSearchCreatableInput = (props: IDynamicSearchCreatableInputProps): ReactElement => {
  const {
    className,
    colors,
    dataTestId,
    disabled,
    fieldSize,
    handleCreate,
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
  const [isCreating, setIsCreating] = useState(false);
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

  const localHandleCreate = (newLabel: string) => {
    setIsLoading(true);
    setIsCreating(true);
    handleCreate(newLabel)
      .then((newOption) => {
        setCurrentOption(newOption);
        if (onChange) {
          onChange(newOption?.value);
        }
      })
      .finally(() => {
        setIsLoading(false);
        setIsCreating(false);
      });
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
        {isLoading ? (
          <Icon icon={['fal', 'spinner']} spin data-testid={dataTestId ? `${dataTestId}-spinner` : undefined} />
        ) : currentOption ? (
          currentOption.label
        ) : (
          '-'
        )}
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
      <ReactSelectAsyncCreatable<IOption, false>
        allowCreateWhileLoading={false}
        closeMenuOnSelect={false}
        components={{
          LoadingIndicator: () => (
            <Icon
              icon={['fal', 'spinner']}
              spin
              className='dynamic-search-spinner'
              data-testid={dataTestId ? `${dataTestId}-spinner` : undefined}
            />
          ),
        }}
        createOptionPosition='last'
        hideSelectedOptions={false}
        inputId={dataTestId}
        isClearable={isClearable}
        isDisabled={isCreating || disabled}
        isLoading={isLoading}
        isSearchable
        loadOptions={searchOptions}
        name={name}
        maxMenuHeight={maxMenuHeight}
        menuPlacement='auto'
        menuPortalTarget={usePortal ? document.querySelector('body') : undefined}
        noOptionsMessage={localNoOptionMessage}
        onChange={(option) => {
          if (onChange) {
            onChange(option?.value);
          }
          setCurrentOption(option || undefined);
          setIsLoading(false);
        }}
        onCreateOption={localHandleCreate}
        placeholder={placeholder}
        styles={customStyles({ ...colors, isInError })}
        value={currentOption}
      />
    </div>
  );
};

DynamicSearchCreatableInput.defaultProps = {
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
  options: undefined,
  placeholder: undefined,
  readOnly: false,
  usePortal: true,
};

export default DynamicSearchCreatableInput;
