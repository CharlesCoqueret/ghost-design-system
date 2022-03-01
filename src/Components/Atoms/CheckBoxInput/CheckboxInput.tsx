import React, { ReactElement, useState } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IToggleEntry } from './types';

export interface ICheckboxInputProps {
  className?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Size of the field in a 12 column grid (optional, default: undefined) */
  fieldSize?: number;
  /** Highlighted field (optional, default: false) */
  highlighted?: boolean;
  /** Error indication should be present (optional, default: undefined) */
  isInError?: boolean;
  /** Input value */
  options: Array<IToggleEntry>;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (values: Array<IToggleEntry>) => void;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
}

const CheckboxInput = (props: ICheckboxInputProps): ReactElement => {
  const { className, disabled, fieldSize, highlighted, isInError, options, onChange, readOnly } = props;

  const [state, setState] = useState<Array<IToggleEntry>>(options);

  /** flip the check status of the checkbox that was checked */
  const updateState = (optionValue: string) => {
    const newState = state.map((option) => {
      if (option.value === optionValue) {
        option.checked = !option.checked;
      }
      return option;
    });
    setState(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  const handleChange = (optionValue: string) => () => {
    if (readOnly || disabled) return;
    updateState(optionValue);
  };

  return (
    <div className={classnames('field', 'checkbox-container', fieldSize && `field-input-size-${fieldSize}`, className)}>
      {state?.map((option) => {
        return (
          <label
            key={option.value}
            onClick={handleChange(option.value)}
            className={classnames({
              'input-checkbox-field-read-only': readOnly,
              'input-checkbox-field-disabled': disabled,
              'input-checkbox-field-error': !readOnly && !disabled && isInError,
              'field-highlighted': (readOnly || disabled) && highlighted && option.highlighted,
              'input-checkbox-field-checked': option.checked,
            })}>
            <div className='checkbox-marker'>
              <FontAwesomeIcon
                icon={[
                  option.checked || disabled || readOnly ? 'fas' : 'fal',
                  option.checked ? 'square-check' : 'square',
                ]}
                size='lg'
              />
            </div>
            {option.label}
          </label>
        );
      })}
    </div>
  );
};

export default CheckboxInput;
