import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { IToggleEntry } from '../CheckBoxInput/types';

export interface ISwitchInputProps {
  className?: string;
  /** For test purpose only */
  dataTestId?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Highlighted field (optional, default: false) */
  highlighted?: boolean;
  /** Error indication should be present (optional, default: false) */
  isInError?: boolean;
  /** Input value */
  options: Array<IToggleEntry>;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (values: Array<IToggleEntry>) => void;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
}

const SwitchInput = (props: ISwitchInputProps): ReactElement => {
  const { className, dataTestId, disabled, highlighted, isInError, options, onChange, readOnly } = props;

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
    <div className={classnames('field', 'gds-switch-container', className)} data-testid={dataTestId}>
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
              <input type='checkbox' checked={option.checked || false} disabled={disabled} readOnly />
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

SwitchInput.defaultProps = {
  className: undefined,
  dataTestId: undefined,
  disabled: false,
  highlighted: false,
  isInError: false,
  onChange: undefined,
  readOnly: false,
};

export default SwitchInput;
