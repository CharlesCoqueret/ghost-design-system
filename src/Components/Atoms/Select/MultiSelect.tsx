import React, { ReactElement } from 'react';
import Select, { components, MultiValue, MultiValueGenericProps, ValueContainerProps } from 'react-select';

import OverflowWrapper from './OverflowWrapper';
import { customStyles } from './selectStyles';
import { IOption } from '../../Molecules/SelectField/types';
import classnames from 'classnames';

export interface IMultiSelectProps {
  className?: string;
  disabled?: boolean;
  isClearable?: boolean;
  isInError?: boolean;
  maxMenuHeight?: number;
  name: string;
  onChange: ((selectedOptions: MultiValue<IOption> | undefined) => void) | undefined;
  options: Array<IOption>;
  placeholder?: string;
  readOnly?: boolean;
  selectedOptions: MultiValue<IOption> | undefined;
}

const MultiValueContainer = (props: MultiValueGenericProps<IOption>) => {
  return (
    <div data-targetid={props.data.value} {...props.innerProps}>
      {props.children}
    </div>
  );
};

const ValueContainer = (props: ValueContainerProps<IOption, true>) => {
  const { children, ...innerProps } = props;

  return (
    <components.ValueContainer {...innerProps}>
      {innerProps.hasValue ? <OverflowWrapper>{children}</OverflowWrapper> : children}
    </components.ValueContainer>
  );
};

const MultiSelect = (props: IMultiSelectProps): ReactElement => {
  const {
    className,
    disabled,
    isClearable,
    isInError,
    maxMenuHeight,
    name,
    onChange,
    options,
    placeholder,
    readOnly,
    selectedOptions,
  } = props;

  if (readOnly)
    return (
      <div className={classnames(className, 'select-container')}>
        {selectedOptions && selectedOptions.length > 0 ? selectedOptions.map((option) => option.label).join(', ') : '-'}
      </div>
    );

  return (
    <div className={classnames(className, 'select-container')}>
      <Select<IOption, true>
        closeMenuOnSelect={false}
        components={{
          ValueContainer,
          MultiValueContainer,
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
        value={selectedOptions}
      />
    </div>
  );
};

MultiSelect.defaultProps = {
  classname: undefined,
  disabled: false,
  isClearable: false,
  isInError: false,
  maxMenuHeight: 300,
  placeholder: undefined,
  readOnly: false,
};

export default MultiSelect;
