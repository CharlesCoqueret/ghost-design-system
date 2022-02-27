import React, { ReactElement } from 'react';
import { default as ReactSelect } from 'react-select';
import classnames from 'classnames';

import { IOption } from '../../Molecules/SelectField/types';
import { customStyles } from './selectStyles';

export interface ISelectProps {
  className?: string;
  disabled?: boolean;
  isInError?: boolean;
  maxMenuHeight?: number;
  name: string;
  onChange: ((selectedOption: IOption | null | undefined) => void) | undefined;
  options: Array<IOption>;
  placeholder?: string;
  readOnly?: boolean;
  selectedOption: IOption | null | undefined;
}

const Select = (props: ISelectProps): ReactElement => {
  const {
    className,
    disabled,
    isInError,
    maxMenuHeight,
    name,
    onChange,
    options,
    placeholder,
    readOnly,
    selectedOption,
  } = props;

  if (readOnly)
    return (
      <div className={classnames(className, 'select-container')}>{selectedOption ? selectedOption.label : '-'}</div>
    );

  return (
    <div className={classnames(className, 'select-container')}>
      <ReactSelect<IOption, false>
        hideSelectedOptions={false}
        isClearable
        isDisabled={disabled}
        isSearchable
        maxMenuHeight={maxMenuHeight}
        menuPlacement='auto'
        name={name}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        styles={customStyles({ isInError })}
        value={selectedOption}
      />
    </div>
  );
};

Select.defaultProps = {
  disabled: false,
  isInError: false,
  maxMenuHeight: 300,
  placeholder: undefined,
  readOnly: false,
};

export default Select;
