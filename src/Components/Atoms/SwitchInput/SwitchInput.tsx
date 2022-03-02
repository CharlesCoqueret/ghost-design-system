import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { IToggleEntry } from '../CheckBoxInput/types';

export interface ISwitchInputProps {
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

const SwitchInput = (props: ISwitchInputProps): ReactElement => {
  const { className, disabled, fieldSize, highlighted, isInError, options, onChange, readOnly } = props;

  /** flip the check status of the switch that was checked */
  const updateState = (optionValue: string) => {
    const newState = options.map((option) => {
      if (option.value === optionValue) {
        option.checked = !option.checked;
      }
      return option;
    });

    if (onChange) {
      onChange(newState);
    }
  };

  const handleChange = (optionValue: string) => (event: React.MouseEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (readOnly || disabled) return;
    updateState(optionValue);
  };

  return (
    <div className={classnames('field', 'switch-container', fieldSize && `field-input-size-${fieldSize}`, className)}>
      {options?.map((option) => {
        return (
          <label
            key={option.value}
            onClick={handleChange(option.value)}
            className={classnames({
              'input-switch-field-read-only': readOnly,
              'input-switch-field-disabled': disabled,
              'input-switch-field-error': !readOnly && !disabled && isInError,
              'field-highlighted': (readOnly || disabled) && highlighted && option.highlighted,
              'input-switch-field-checked': option.checked,
            })}
            data-testid={option.value}>
            <div className='switch-marker'>
              <input type='checkbox' checked={option.checked} disabled={disabled} readOnly />
              <span
                className={classnames({
                  primary: option.checked && !readOnly && !disabled,
                  pebble: !option.checked && !readOnly && !disabled,
                  silver: readOnly || disabled,
                })}
              />
            </div>
            {option.label}
          </label>
        );
      })}
    </div>
  );
};

export default SwitchInput;
