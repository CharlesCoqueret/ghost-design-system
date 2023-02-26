import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AmountField, IAmountFieldProps } from './AmountField';

export default {
  title: 'Molecule/AmountField',
  component: AmountField,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof AmountField>;

const Template: ComponentStory<typeof AmountField> = ({ inputValue, ...args }: IAmountFieldProps) => {
  const [localValue, setLocalValue] = useState<number | string | undefined>(inputValue);
  return <AmountField {...args} inputValue={localValue} onChange={setLocalValue} />;
};

export const Default = Template.bind({});
Default.args = {
  inputValue: 1234567890,
  label: 'Amount field',
  placeholder: 'Placeholder amount',
  suffix: '€',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  fieldSize: 2,
  inputValue: 1234567890,
  label: 'Amount field in read only with label size = 4 and field size = 2',
  labelSize: 4,
  readOnly: true,
  suffix: '€',
};

export const Error = Template.bind({});
Error.args = {
  errorMessage: 'This amount is on error',
  inputValue: 1234567890,
  label: 'Amount field in error',
  placeholder: 'Placeholder amount',
  suffix: '€',
};

export const HelperAndLimit = Template.bind({});
HelperAndLimit.args = {
  helperText: 'Helper text',
  inputValue: 12,
  label: 'Amount field with helper and maximum value: 100',
  mandatory: true,
  maxValue: 100,
  suffix: '€',
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  helperText: 'Helper text',
  highlighted: true,
  inputValue: 1234567890,
  label: 'Amount field highlighted',
  readOnly: true,
  suffix: '€',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  helperText: 'Helper text',
  inputValue: 1234567890,
  label: "Amount field disabled and ' as thousand separator",
  suffix: '€',
  thousandSeparator: "'",
};
