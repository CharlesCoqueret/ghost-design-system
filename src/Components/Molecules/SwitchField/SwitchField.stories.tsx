import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SwitchField, { ISwitchFieldProps } from './SwitchField';
import { IToggleEntry } from '../..';

const options: Array<IToggleEntry> = [
  { label: 'Switch label 0', value: 'KEY_0' },
  { label: 'Switch label 1', value: 'KEY_1', checked: true },
  {
    label: 'Switch label 2 - which can sometimes be ' + 'very '.repeat(10) + ' long',
    value: 'KEY_2',
    checked: false,
  },
  {
    label: 'Switch label 3 - which can sometimes be ' + 'extremely '.repeat(50) + ' long',
    value: 'KEY_3',
    checked: undefined,
  },
  { label: 'Switch label 4 highlighted', value: 'KEY_4', highlighted: true },
  { label: 'Switch label 5 highlighted and checked', value: 'KEY_5', highlighted: true, checked: true },
];

export default {
  title: 'Molecule/SwitchField',
  component: SwitchField,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof SwitchField>;

const Template: ComponentStory<typeof SwitchField> = ({ inputValue, ...args }: ISwitchFieldProps) => {
  const [localValue, setLocalValue] = useState<Array<IToggleEntry>>(inputValue);
  return (
    <SwitchField
      {...args}
      inputValue={localValue}
      onChange={(value) => {
        if (args.onChange) {
          args.onChange(value);
        }
        setLocalValue(value);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Switch field',
  inputValue: options,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  fieldSize: 6,
  label: 'Switch field in read only with label size = 4 and field size = 6',
  labelSize: 4,
  readOnly: true,
  inputValue: options,
};

export const Error = Template.bind({});
Error.args = {
  fieldSize: 6,
  label: 'Switch field in error with label size = 4 and field size = 6',
  labelSize: 4,
  errorMessage: 'This text is on error',
  inputValue: options,
};

export const Helper = Template.bind({});
Helper.args = {
  helperText: 'Helper text',
  label: 'Switch field with helper and counter',
  mandatory: true,
  inputValue: options,
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  helperText: 'Helper text',
  highlighted: true,
  readOnly: true,
  label: 'Switch field highlighted',
  inputValue: options,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  helperText: 'Helper text',
  label: 'Switch field disabled',
  inputValue: options,
};
