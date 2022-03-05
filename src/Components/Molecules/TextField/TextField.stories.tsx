import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextField, ITextFieldProps } from './TextField';

export default {
  title: 'Molecule/TextField',
  component: TextField,
  parameters: { controls: { sort: 'requiredFirst' } },
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args: ITextFieldProps) => {
  return <TextField {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder text',
  name: 'name',
  label: 'Text field test',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  inputValue: 'This is a rather long sample text',
  name: 'name',
  label: 'Text field in read only with label size = 4 and field size = 2',
  readOnly: true,
  fieldSize: 2,
  labelSize: 4,
};

export const Error = Template.bind({});
Error.args = {
  placeholder: 'Placeholder text',
  name: 'name',
  label: 'Text field in error',
  errorMessage: 'This text is on error',
};

export const HelperAndCounter = Template.bind({});
HelperAndCounter.args = {
  name: 'name',
  label: 'Text field with helper and counter',
  helperText: 'Helper text',
  maxLength: 20,
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  name: 'name',
  label: 'Text field highlighted',
  inputValue: 'This is a highlighted sample text',
  readOnly: true,
  highlighted: true,
  helperText: 'Helper text',
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: 'name',
  label: 'Text field highlighted',
  inputValue: 'This is a disabled sample text',
  disabled: true,
  helperText: 'Helper text',
};
