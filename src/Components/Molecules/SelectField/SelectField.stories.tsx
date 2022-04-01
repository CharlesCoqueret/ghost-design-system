import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SelectField, { ISelectFieldProps } from './SelectField';
import { IOption } from '../../Atoms/';

const selectedOptions = {
  label: 'selection label 2 - which can sometimes be ' + 'very '.repeat(10) + ' long',
  value: 'KEY_2',
};

const options = [
  { label: 'selection label 0', value: 'KEY_0' },
  { label: 'selection label 1', value: 'KEY_1' },
  selectedOptions,
  {
    label: 'selection label 3 - which can sometimes be ' + 'extremely '.repeat(50) + ' long',
    value: 'KEY_3',
  },
  { label: 'selection label 4', value: 'KEY_4' },
  { label: 'selection label 5', value: 'KEY_5' },
  { label: 'selection label 6', value: 'KEY_6' },
  { label: 'selection label 7', value: 'KEY_7' },
  { label: 'selection label 8', value: 'KEY_8' },
  { label: 'selection label 9', value: 'KEY_9' },
  { label: 'selection label 10', value: 'KEY_10' },
];

export default {
  title: 'Molecule/SelectField',
  component: SelectField,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof SelectField>;

const ManagedTemplate: ComponentStory<typeof SelectField> = (args: ISelectFieldProps) => {
  const [inputValue, setInputValue] = useState<string | number | null | undefined>(undefined);
  return <SelectField {...args} inputValue={inputValue ? inputValue : undefined} onChange={setInputValue} />;
};

const Template: ComponentStory<typeof SelectField> = (args: ISelectFieldProps) => {
  return <SelectField {...args} />;
};

export const Default = ManagedTemplate.bind({});
Default.args = {
  label: 'Select field',
  name: 'name',
  options: options,
  placeholder: 'Select placeholder',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  fieldSize: 6,
  label: 'Select field in read only with label size = 4 and field size = 6',
  labelSize: 4,
  name: 'name',
  options: options,
  placeholder: 'Select placeholder',
  readOnly: true,
  inputValue: selectedOptions,
};

export const Error = ManagedTemplate.bind({});
Error.args = {
  fieldSize: 6,
  label: 'Select field in error with label size = 4 and field size = 6',
  labelSize: 4,
  name: 'name',
  options: options,
  placeholder: 'Select placeholder',
  errorMessage: 'This text is on error',
};

export const Helper = ManagedTemplate.bind({});
Helper.args = {
  helperText: 'Helper text',
  label: 'Select field with helper and counter',
  mandatory: true,
  name: 'name',
  options: options,
  placeholder: 'Select placeholder',
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  helperText: 'Helper text',
  highlighted: true,
  label: 'Select field highlighted',
  name: 'name',
  options: options,
  placeholder: 'Select placeholder',
  readOnly: true,
  inputValue: selectedOptions,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  helperText: 'Helper text',
  label: 'Select field disabled',
  name: 'name',
  options: options,
  placeholder: 'Select placeholder',
  inputValue: selectedOptions,
};
