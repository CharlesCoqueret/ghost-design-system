import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import YearPickerField, { IYearPickerFieldProps } from './YearPickerField';

export default {
  title: 'Molecule/YearPickerField',
  component: YearPickerField,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof YearPickerField>;

const Template: ComponentStory<typeof YearPickerField> = ({ inputValue, ...args }: IYearPickerFieldProps) => {
  const [localValue, setLocalValue] = useState<number | undefined>(inputValue);
  return <YearPickerField {...args} inputValue={localValue} onChange={setLocalValue} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Year picker field',
  name: 'name',
  placeholder: 'Select a Year',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  fieldSize: 6,
  label: 'Year picker field in read only with label size = 4 and field size = 6',
  labelSize: 4,
  name: 'name',
  placeholder: 'Year picker placeholder',
  readOnly: true,
  inputValue: new Date().getFullYear(),
};

export const Error = Template.bind({});
Error.args = {
  fieldSize: 6,
  label: 'Year picker field in error with label size = 4 and field size = 6',
  labelSize: 4,
  name: 'name',
  placeholder: 'Year picker placeholder',
  errorMessage: 'This text is on error',
  inputValue: new Date().getFullYear(),
};

export const Helper = Template.bind({});
Helper.args = {
  helperText: 'Helper text',
  label: 'Year picker field with helper and counter',
  mandatory: true,
  name: 'name',
  placeholder: 'Year picker placeholder',
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  helperText: 'Helper text',
  highlighted: true,
  readOnly: true,
  label: 'Year picker field highlighted',
  name: 'name',
  placeholder: 'Year picker placeholder',
  inputValue: new Date().getFullYear(),
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  helperText: 'Helper text',
  label: 'Year picker field disabled',
  name: 'name',
  placeholder: 'Year picker placeholder',
  inputValue: new Date().getFullYear(),
};
