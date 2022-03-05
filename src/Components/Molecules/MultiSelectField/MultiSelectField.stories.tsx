import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MultiSelectField, { IMultiSelectFieldProps } from './MultiSelectField';
import { IOption } from '../../Atoms';

const selectedOptions = [
  { label: 'selection label 0', value: 'KEY_0' },
  { label: 'selection label 1', value: 'KEY_1' },
  {
    label: 'selection label 2 - which can sometimes be ' + 'very '.repeat(10) + ' long',
    value: 'KEY_2',
  },
];

const options = [
  ...selectedOptions,
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
  title: 'Molecule/MultiSelectField',
  component: MultiSelectField,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof MultiSelectField>;

const ManagedTemplate: ComponentStory<typeof MultiSelectField> = (args: IMultiSelectFieldProps) => {
  const [inputValue, setInputValue] = useState<Readonly<Array<IOption>> | null | undefined>(undefined);
  return <MultiSelectField {...args} inputValue={inputValue ? inputValue : undefined} onChange={setInputValue} />;
};

const Template: ComponentStory<typeof MultiSelectField> = (args: IMultiSelectFieldProps) => {
  return <MultiSelectField {...args} />;
};

export const Default = ManagedTemplate.bind({});
Default.args = {
  label: 'MultiSelect field',
  name: 'name',
  options: options,
  placeholder: 'Multi select placeholder',
  isClearable: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  fieldSize: 6,
  label: 'MuliSelect field in read only with label size = 4 and field size = 6',
  labelSize: 4,
  name: 'name',
  options: options,
  placeholder: 'Multi select placeholder',
  readOnly: true,
  inputValue: selectedOptions,
};

export const Error = ManagedTemplate.bind({});
Error.args = {
  fieldSize: 6,
  label: 'MuliSelect field in error with label size = 4 and field size = 6',
  labelSize: 4,
  name: 'name',
  options: options,
  placeholder: 'Multi select placeholder',
  errorMessage: 'This text is on error',
};

export const Helper = ManagedTemplate.bind({});
Helper.args = {
  helperText: 'Helper text',
  label: 'MultiSelect field with helper and counter',
  mandatory: true,
  name: 'name',
  options: options,
  placeholder: 'Multi select placeholder',
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  helperText: 'Helper text',
  highlighted: true,
  label: 'MultiSelect field highlighted',
  name: 'name',
  options: options,
  placeholder: 'Multi select placeholder',
  readOnly: true,
  inputValue: selectedOptions,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  helperText: 'Helper text',
  label: 'MultiSelect field disabled',
  name: 'name',
  options: options,
  placeholder: 'Multi select placeholder',
  inputValue: selectedOptions,
};
