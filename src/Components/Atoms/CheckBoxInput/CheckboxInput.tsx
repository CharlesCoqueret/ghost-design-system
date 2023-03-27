import React, { ReactElement, useState } from 'react';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';

import { IToggleEntry } from './types';
import { Icon } from '../Icon';

import styles from './CheckboxInput.module.scss';

export interface ICheckboxInputProps {
  /** Additional class names to be added (optional, default: undefined) */
  className?: string;
  /** For test purpose only */
  dataTestId?: string;
  /** Disabled field (optional, default: false) */
  disabled?: boolean;
  /** Ellipse text when it overflows, or wrap (optional, default: false) */
  ellipsis?: boolean;
  /** Highlighted field (optional, default: false) */
  highlighted?: boolean;
  /** Inline options (optional, default: false) */
  inline?: boolean;
  /** Input value */
  input: Array<IToggleEntry>;
  /** Error indication should be present (optional, default: undefined) */
  isInError?: boolean;
  /** Base name of input (optional, default: undefined) */
  name?: string;
  /** Handler of value changes (optional, default: undefined) */
  onChange?: (values: Array<IToggleEntry>) => void;
  /** Read only field (optional, default: false) */
  readOnly?: boolean;
}

const CheckboxInput = (props: ICheckboxInputProps): ReactElement => {
  const { className, dataTestId, disabled, ellipsis, highlighted, inline, input, onChange, readOnly } = props;
  const [ids] = useState(() => input.map(() => uniqueId('checkbox-')));

  /** flip the check status of the checkbox that was checked */
  const updateState = (optionValue: string) => {
    const newState = input.map((option) => {
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
    <div className={classnames(styles.container, { [styles.inlineContainer]: inline }, className)}>
      {input.map((option, index) => {
        return (
          <label
            className={classnames(styles.label, {
              [styles.inlineLabel]: inline,
              [styles.readOnly]: readOnly,
              [styles.disabled]: disabled,
              [styles.highlighted]: (readOnly || disabled) && highlighted && option.highlighted,
              [styles.checked]: option.checked,
              [styles.ellipsis]: ellipsis,
            })}
            data-testid={dataTestId ? `${dataTestId}-${index}` : undefined}
            htmlFor={ids[index]}
            key={option.value}
            onClick={handleChange(option.value)}
            onKeyUp={handleChange(option.value)}
            tabIndex={readOnly || disabled ? -1 : 0}>
            <div
              aria-checked={option.checked}
              aria-label={option.label.toString()}
              className={classnames(styles.checkboxMarker, {
                [styles.checked]: option.checked,
                [styles.disabled]: disabled,
                [styles.readOnly]: readOnly,
              })}
              // TODO use input type checkbox hidden with icon to show the state instead of a div
              // name={name !== undefined ? `${name}-${option.value}` : undefined}
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
  ellipsis: false,
  highlighted: false,
  inline: false,
  input: [],
  isInError: false,
  onChange: undefined,
  readOnly: false,
};

export default CheckboxInput;
