import React, { ReactElement, useState } from 'react';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';

import { IToggleEntry } from '../CheckBoxInput/types';

import styles from './SwitchInput.module.scss';

export interface ISwitchInputProps {
  className?: string;
  /** For test purpose only */
  dataTestId?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Ellipse text when it overflows, or wrap (optional, default: false) */
  ellipsis?: boolean;
  /** Highlighted field and highlight the toggle entries marked as highlight (optional, default: false) */
  highlighted?: boolean;
  /** Error indication should be present (optional, default: false) */
  isInError?: boolean;
  /** Input value */
  inputValue: Array<IToggleEntry>;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (values: Array<IToggleEntry>) => void;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
}

const SwitchInput = (props: ISwitchInputProps): ReactElement => {
  const { className, dataTestId, disabled, highlighted, inputValue, onChange, readOnly } = props;
  const [ids] = useState(() => inputValue.map(() => uniqueId('switch-')));

  /** flip the check status of the switch that was checked */
  const updateState = (optionValue: string) => {
    const newState = inputValue.map((option) => {
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
      event.preventDefault();
      if (readOnly || disabled) return;
      updateState(optionValue);
    };

  return (
    <div className={classnames(styles.container, className)} data-testid={dataTestId}>
      {inputValue.map((option, index) => {
        return (
          <label
            className={classnames(styles.label, {
              [styles.readOnly]: readOnly,
              [styles.disabled]: disabled,
              [styles.highlighted]: (readOnly || disabled) && highlighted && option.highlighted,
            })}
            data-testid={dataTestId ? `${dataTestId}-${index}` : undefined}
            htmlFor={ids[index]}
            key={option.value}
            onClick={handleChange(option.value)}
            onKeyUp={handleChange(option.value)}
            tabIndex={readOnly || disabled ? -1 : 0}>
            <div className={styles.switch}>
              <input
                type='checkbox'
                aria-hidden
                checked={option.checked === undefined ? false : option.checked}
                disabled={disabled}
                readOnly
              />
              <span
                aria-checked={option.checked}
                aria-label={option.label.toString()}
                className={classnames({
                  [styles.primary]: option.checked && !(readOnly || disabled),
                  [styles.pebble]: !option.checked && !(readOnly || disabled),
                  [styles.silver]: readOnly || disabled,
                })}
                id={ids[index]}
                role='checkbox'
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
  ellipsis: false,
  highlighted: false,
  inputValue: [],
  isInError: false,
  onChange: undefined,
  readOnly: false,
};

export default SwitchInput;
