import React, { ReactElement, useState } from 'react';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';

import { IToggleEntry } from './types';
import { Icon } from '../Icon';

export interface ICheckboxInputProps {
  /** Additional class names to be added (optional, default: undefined) */
  className?: string;
  /** For test purpose only */
  dataTestId?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Highlighted field (optional, default: false) */
  highlighted?: boolean;
  /** Inline options (optional, default: false) */
  inline?: boolean;
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
  const { className, dataTestId, disabled, highlighted, inline, isInError, options, onChange, readOnly } = props;
  const [ids] = useState(() => options.map(() => uniqueId('checkbox-')));

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

  const handleChange =
    (optionValue: string) => (event: React.KeyboardEvent<HTMLLabelElement> | React.MouseEvent<HTMLLabelElement>) => {
      if (event.type === 'keyup') {
        if ((event as React.KeyboardEvent<HTMLLabelElement>).key !== ' ') {
          return;
        }
      }
      if (readOnly || disabled) return;
      updateState(optionValue);
    };

  return (
    <div className={classnames('field', 'gds-checkbox-container', { inline: inline }, className)}>
      {options.map((option, index) => {
        return (
          <label
            className={classnames({
              'input-checkbox-field-read-only': readOnly,
              'input-checkbox-field-disabled': disabled,
              'input-checkbox-field-error': !readOnly && !disabled && isInError,
              'field-highlighted': (readOnly || disabled) && highlighted && option.highlighted,
              'input-checkbox-field-checked': option.checked,
              inline: inline,
            })}
            data-testid={dataTestId ? `${dataTestId}-${index}` : undefined}
            htmlFor={ids[index]}
            key={option.value}
            onClick={handleChange(option.value)}
            onKeyUp={handleChange(option.value)}
            tabIndex={0}>
            <div
              aria-checked={option.checked}
              aria-label={option.label.toString()}
              className='checkbox-marker'
              id={ids[index]}
              role='checkbox'>
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
  highlighted: false,
  inline: false,
  isInError: false,
  onChange: undefined,
  readOnly: false,
};

export default CheckboxInput;
