import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AmountField, IAmountFieldProps } from './AmountField';

export default {
  title: 'Molecule/AmountField',
  component: AmountField,
  parameters: { controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof AmountField>;

const Template: ComponentStory<typeof AmountField> = (args: IAmountFieldProps) => {
  return <AmountField {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder amount',
  name: 'name',
  label: 'Amount field',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  name: 'name',
  label: 'Amount field in read only with label size = 4 and field size = 2',
  inputValue: 1234567890,
  readOnly: true,
  fieldSize: 2,
  labelSize: 4,
};

export const Error = Template.bind({});
Error.args = {
  placeholder: 'Placeholder amount',
  name: 'name',
  inputValue: 1234567890,
  label: 'Amount field in error',
  errorMessage: 'This amount is on error',
};

export const HelperAndLimit = Template.bind({});
HelperAndLimit.args = {
  name: 'name',
  label: 'Amount field with helper and maximum value: 100',
  helperText: 'Helper text',
  mandatory: true,
  maxValue: 100,
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  name: 'name',
  label: 'Amount field highlighted',
  inputValue: 1234567890,
  readOnly: true,
  highlighted: true,
  helperText: 'Helper text',
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: 'name',
  label: "Amount field disabled and ' as thousand separator",
  inputValue: 1234567890,
  thousandSeparator: "'",
  disabled: true,
  helperText: 'Helper text',
};
