import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { IToggleEntry } from './types';
import { Icon } from '../Icon';

export interface ICheckboxInputProps {
  /** Additional class names to be added (optional, default: undefined) */
  className?: string;
  /** For test purpose only */
  dataTestId?: string;
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
  const { className, dataTestId, disabled, fieldSize, highlighted, isInError, options, onChange, readOnly } = props;

  /** flip the check status of the checkbox that was checked */
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

  const handleChange = (optionValue: string) => () => {
    if (readOnly || disabled) return;
    updateState(optionValue);
  };

  return (
    <div
      className={classnames(
        'field',
        'gds-checkbox-container',
        fieldSize && `field-input-size-${fieldSize}`,
        className,
      )}>
      {options?.map((option) => {
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
            })}
            data-testid={dataTestId || option.value}>
            <div className='checkbox-marker'>
              <Icon
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

CheckboxInput.defaultProps = {
  classname: undefined,
  disabled: false,
  fieldSize: undefined,
  highlighted: false,
  isInError: false,
  onChange: undefined,
  readOnly: false,
};

export default CheckboxInput;
