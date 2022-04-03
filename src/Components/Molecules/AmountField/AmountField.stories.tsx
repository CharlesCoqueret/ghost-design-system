import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AmountField, IAmountFieldProps } from './AmountField';

export default {
  title: 'Molecule/AmountField',
  component: AmountField,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof AmountField>;

const Template: ComponentStory<typeof AmountField> = (args: IAmountFieldProps) => {
  return <AmountField {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Amount field',
  name: 'name',
  placeholder: 'Placeholder amount',
  suffix: '€',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  fieldSize: 2,
  inputValue: 1234567890,
  label: 'Amount field in read only with label size = 4 and field size = 2',
  labelSize: 4,
  name: 'name',
  readOnly: true,
  suffix: '€',
};

export const Error = Template.bind({});
Error.args = {
  errorMessage: 'This amount is on error',
  inputValue: 1234567890,
  label: 'Amount field in error',
  name: 'name',
  placeholder: 'Placeholder amount',
  suffix: '€',
};

export const HelperAndLimit = Template.bind({});
HelperAndLimit.args = {
  helperText: 'Helper text',
  label: 'Amount field with helper and maximum value: 100',
  mandatory: true,
  maxValue: 100,
  name: 'name',
  suffix: '€',
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  helperText: 'Helper text',
  highlighted: true,
  inputValue: 1234567890,
  label: 'Amount field highlighted',
  name: 'name',
  readOnly: true,
  suffix: '€',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  helperText: 'Helper text',
  inputValue: 1234567890,
  label: "Amount field disabled and ' as thousand separator",
  name: 'name',
  suffix: '€',
  thousandSeparator: "'",
};
