import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckboxField, { ICheckboxFieldProps } from './CheckboxField';
import { IToggleEntry } from '../..';

const options: Array<IToggleEntry> = [
  { label: 'checkbox label 0', value: 'KEY_0' },
  { label: 'checkbox label 1', value: 'KEY_1', checked: true },
  {
    label: 'checkbox label 2 - which can sometimes be ' + 'very '.repeat(10) + ' long',
    value: 'KEY_2',
    checked: false,
  },
  {
    label: 'checkbox label 3 - which can sometimes be ' + 'extremely '.repeat(50) + ' long',
    value: 'KEY_3',
    checked: undefined,
  },
  { label: 'checkbox label 4 highlighted', value: 'KEY_4', highlighted: true },
  { label: 'checkbox label 5 highlighted and checked', value: 'KEY_5', highlighted: true, checked: true },
];

export default {
  title: 'Molecule/CheckboxField',
  component: CheckboxField,
} as ComponentMeta<typeof CheckboxField>;

const Template: ComponentStory<typeof CheckboxField> = ({ inputValue, ...args }: ICheckboxFieldProps) => {
  const [localValue, setLocalValue] = useState<Array<IToggleEntry>>(inputValue);
  return <CheckboxField {...args} inputValue={localValue} onChange={setLocalValue} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Checkbox field',
  inputValue: options,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  fieldSize: 6,
  label: 'Checkbox field in read only with label size = 4 and field size = 6',
  labelSize: 4,
  readOnly: true,
  inputValue: options,
};

export const Error = Template.bind({});
Error.args = {
  fieldSize: 6,
  label: 'Checkbox field in error with label size = 4 and field size = 6',
  labelSize: 4,
  errorMessage: 'This text is on error',
  inputValue: options,
};

export const Helper = Template.bind({});
Helper.args = {
  helperText: 'Helper text',
  label: 'Checkbox field with helper and counter',
  mandatory: true,
  inputValue: options,
};

export const InLine = Template.bind({});
InLine.args = {
  label: 'Checkbox inline mandatory and field size = 3',
  inline: true,
  mandatory: true,
  inputValue: [options[0]],
  fieldSize: 3,
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  helperText: 'Helper text',
  highlighted: true,
  readOnly: true,
  label: 'Checkbox field highlighted',
  inputValue: options,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  helperText: 'Helper text',
  label: 'Checkbox field disabled',
  inputValue: options,
};
