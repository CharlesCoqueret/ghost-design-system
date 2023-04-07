import React, { ReactElement, useCallback } from 'react';
import {
  default as ReactSelect,
  components,
  ValueContainerProps,
  DropdownIndicatorProps,
  ClearIndicatorProps,
} from 'react-select';
import classnames from 'classnames';

import { customStyles } from './selectStyles';
import { IOption } from './types';
import { Icon } from '../Icon';
import { Typography } from '../Typography';

import styles from './SelectInput.module.scss';

export interface IMultiSelectInputProps {
  /** Class for the input (optional, default: undefined) */
  className?: string;
  /** For test purpose only */
  dataTestId?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Ellipsis in readonly (optional, default: false) */
  ellipsis?: boolean;
  /** Highlight value in readonly mode (optional, default: false) */
  highlighted?: boolean;
  /** Input string value (optional, default: undefined) */
  input?: Array<string | number>;
  /** Provide the ability to clear the value (optional, default: false) */
  isClearable?: boolean;
  /** Is in Error (optional, default: false) */
  isInError?: boolean;
  /** Maximum height of the menu in px (optional, default: 300) */
  maxMenuHeight?: number;
  /** Name of input (optional, default: undefined) */
  name?: string;
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
    dataTestId,
    disabled,
    ellipsis,
    highlighted,
    input,
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
    [numberOfItemLabel, numberOfItemsLabel],
  );

  if (readOnly || disabled) {
    return (
      <div
        className={classnames(
          styles.container,
          {
            [styles.highlighted]: (readOnly || disabled) && highlighted,
          },
          className,
        )}
        data-testid={dataTestId}>
        <Typography.Text ellipsis={ellipsis}>
          {options
            .filter((option) => input?.includes(option.value))
            .map((option) => option.label)
            .join(', ') || '-'}
        </Typography.Text>
      </div>
    );
  }

  return (
    <div className={classnames(styles.container, className)}>
      <ReactSelect<IOption, true>
        closeMenuOnSelect={false}
        components={{
          DropdownIndicator: (props: DropdownIndicatorProps<IOption, true>) => {
            const { innerProps } = props;
            return (
              <div {...innerProps}>
                <Icon
                  icon={['fal', 'chevron-down']}
                  className={styles.icon}
                  data-testid={dataTestId ? `${dataTestId}-magnifier` : undefined}
                />
              </div>
            );
          },
          ClearIndicator: (props: ClearIndicatorProps<IOption, true>) => {
            const { innerProps } = props;
            return (
              <div {...innerProps}>
                <Icon
                  icon={['fal', 'xmark']}
                  className={styles.icon}
                  data-testid={dataTestId ? `${dataTestId}-clear` : undefined}
                />
              </div>
            );
          },
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
        menuShouldBlockScroll={true}
        onChange={(options) => {
          if (onChange) {
            onChange(options.map((option) => option.value));
          }
        }}
        options={options}
        placeholder={placeholder}
        styles={customStyles({ isInError: isInError && !(disabled && readOnly) })}
        value={options.filter((option) => input && input.indexOf(option.value) >= 0)}
      />
    </div>
  );
};

MultiSelectInput.defaultProps = {
  className: undefined,
  disabled: false,
  ellipsis: false,
  highlighted: false,
  input: undefined,
  isClearable: false,
  isInError: false,
  maxMenuHeight: 300,
  name: undefined,
  numberOfItemLabel: '{} item selected',
  numberOfItemsLabel: '{} items selected',
  onChange: undefined,
  placeholder: undefined,
  readOnly: false,
  usePortal: true,
};

export default MultiSelectInput;
