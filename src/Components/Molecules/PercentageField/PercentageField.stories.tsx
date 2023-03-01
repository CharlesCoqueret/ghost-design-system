import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PercentageField, IPercentageFieldProps } from './PercentageField';

export default {
  title: 'Molecule/PercentageField',
  component: PercentageField,
  parameters: { actions: { argTypesRegex: '^on.*' }, controls: { sort: 'requiredFirst' } },
  argTypes: {
    dataTestId: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof PercentageField>;

const Template: ComponentStory<typeof PercentageField> = (args: IPercentageFieldProps) => {
  return <PercentageField {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder Percentage',
  label: 'Percentage field',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  label: 'Percentage field in read only with label size = 4 and field size = 2',
  inputValue: 1234567890,
  readOnly: true,
  fieldSize: 2,
  labelSize: 4,
};

export const Error = Template.bind({});
Error.args = {
  placeholder: 'Placeholder Percentage',
  inputValue: 1234567890,
  label: 'Percentage field in error',
  errorMessage: 'This Percentage is on error',
};

export const HelperAndCounter = Template.bind({});
HelperAndCounter.args = {
  label: 'Percentage field with helper and maximum value: 100',
  helperText: 'Helper text',
  mandatory: true,
  maxValue: 100,
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  label: 'Percentage field highlighted',
  inputValue: 1234567890,
  readOnly: true,
  highlighted: true,
  helperText: 'Helper text',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Percentage field disabled and ' as thousand separator",
  inputValue: 1234567890,
  thousandSeparator: "'",
  disabled: true,
  helperText: 'Helper text',
};
